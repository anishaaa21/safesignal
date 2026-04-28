import { useState } from 'react';
import MapView from '../components/MapView';
import useUserLocation from '../hooks/useUserLocation';

export default function Home() {
  const { location, error } = useUserLocation();
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="relative">
      <MapView userLocation={location} />
      
      {/* Report button — bottom left above navbar */}
      <button
        onClick={() => setShowReport(true)}
        className="fixed bottom-24 left-4 z-40 
                   bg-orange-500 hover:bg-orange-600 
                   text-white font-bold px-4 py-3 
                   rounded-2xl shadow-xl text-sm"
      >
        + Report Incident
      </button>

      {/* Location error banner */}
      {error && (
        <div className="fixed top-4 left-4 right-4 z-40 
                        bg-yellow-800 text-yellow-200 
                        px-4 py-2 rounded-xl text-sm text-center">
          ⚠️ Location access denied — showing default location
        </div>
      )}

      {/* ReportForm — Member 3 builds this, you import it */}
      {showReport && (
        <div>
          {/* Import ReportForm here once Member 3 builds it */}
          {/* <ReportForm userLocation={location} onClose={() => setShowReport(false)} /> */}
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 
                          flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-2xl">
              <p className="text-white mb-4">Report form coming soon...</p>
              <button onClick={() => setShowReport(false)} 
                      className="bg-red-600 text-white px-4 py-2 rounded-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}