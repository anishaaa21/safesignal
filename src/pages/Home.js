import { useState } from 'react';
import SafeMap from '../components/MapView';
import useCurrentPosition from '../hooks/useUserLocation';

export default function HomePage() {
  const { location: userCoords, error: locationError } = useCurrentPosition();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className="relative">
      <SafeMap userLocation={userCoords} />

      <button
        onClick={() => setReportModalOpen(true)}
        className="fixed bottom-24 left-4 z-40 
                   bg-orange-500 hover:bg-orange-600 
                   text-white font-bold px-4 py-3 
                   rounded-2xl shadow-xl text-sm"
      >
        + Report Incident
      </button>

      {locationError && (
        <div className="fixed top-4 left-4 right-4 z-40 
                        bg-yellow-800 text-yellow-200 
                        px-4 py-2 rounded-xl text-sm text-center">
          ⚠️ Location access denied — showing default location
        </div>
      )}

      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 
                        flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <p className="text-white mb-4">Report form coming soon...</p>
            <button
              onClick={() => setReportModalOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}