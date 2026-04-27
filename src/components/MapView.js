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
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#373737' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

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
      (err) => console.error(err)
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

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <TimeFilter active={timeFilter} onChange={setTimeFilter} />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 12.9716, lng: 77.5946 }}
        zoom={15}
        options={{ styles: darkMapStyle }}
      >
        {userLocation && window.google && (
          <Marker
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3B8BFF',
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
            }}
          />
        )}

        {filteredReports.map((report) => (
          <Marker
            key={report.id}
            position={report.location}
            label={{ text: getMarkerColor(report) }}
            onClick={() => setSelectedReport(report)}
          />
        ))}

        {selectedReport && (
          <InfoWindow
            position={selectedReport.location}
            onCloseClick={() => setSelectedReport(null)}
          >
            <div>
              <strong>{selectedReport.incidentType}</strong>
              <p>{selectedReport.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}