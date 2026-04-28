import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import TimeFilter from './TimeFilter';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#373737' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

const mapOptions = {
  styles: darkMapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function MapView({ userLocation }) {
  const [reports, setReports] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'reports'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(data);
      },
      (err) => console.error('Firestore error:', err)
    );
    return () => unsub();
  }, []);

  const filteredReports = useMemo(() => {
    return timeFilter === 'all'
      ? reports
      : reports.filter((r) => r.timeOfDay === timeFilter);
  }, [reports, timeFilter]);

  const getMarkerColor = (report) => {
    if (report.upvotes >= 5) return '🔴';
    if (report.upvotes >= 2) return '🟠';
    return '🟡';
  };

  if (loadError) return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-red-400">
      ❌ Map failed to load. Check your API key.
    </div>
  );

  if (!isLoaded) return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent 
                        rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading SafeSignal Map...</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen">

      {/* Time Filter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <TimeFilter active={timeFilter} onChange={setTimeFilter} />
      </div>

      {/* Report count badge */}
      <div className="absolute top-16 right-4 z-10 bg-gray-900 bg-opacity-90 
                      px-3 py-2 rounded-xl text-xs text-gray-300">
        📍 {filteredReports.length} reports
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 12.9716, lng: 77.5946 }}
        zoom={15}
        options={mapOptions}
      >
        {/* User location blue dot */}
        {userLocation && window.google && (
          <Marker
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#3B8BFF',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}

        {/* Incident markers */}
        {filteredReports.map((report) => (
          <Marker
            key={report.id}
            position={report.location}
            label={{
              text: getMarkerColor(report),
              fontSize: '20px',
            }}
            onClick={() => setSelectedReport(report)}
          />
        ))}

        {/* Info popup on marker click */}
        {selectedReport && (
          <InfoWindow
            position={selectedReport.location}
            onCloseClick={() => setSelectedReport(null)}
          >
            <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '12px', borderRadius: '12px', minWidth: '180px' }}>
              <p style={{ fontWeight: 'bold', color: '#f87171', marginBottom: '4px' }}>
                ⚠️ {selectedReport.incidentType}
              </p>
              <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '8px' }}>
                {selectedReport.description || 'No description'}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '12px' }}>
                🕐 {selectedReport.timeOfDay} | 👍 {selectedReport.upvotes} | 👎 {selectedReport.downvotes}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}