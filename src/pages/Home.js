import { useState } from 'react';
import MapView from '../components/MapView';
import ReportForm from '../components/ReportForm';
import useUserLocation from '../hooks/useUserLocation';

export default function Home() {
  const { location: userCoords, error: locationError } = useUserLocation();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <MapView userLocation={userCoords} />

      {/* Report button */}
      <button
        onClick={() => setReportModalOpen(true)}
        style={{
          position: 'fixed', bottom: '90px', left: '16px', zIndex: 40,
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'white', fontFamily: 'Syne, sans-serif',
          fontWeight: 600, fontSize: '13px',
          padding: '12px 18px', borderRadius: '50px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'var(--crimson)',
          boxShadow: '0 0 8px var(--crimson)',
          display: 'inline-block',
          animation: 'glowPulse 2s ease-in-out infinite',
        }} />
        Report Incident
      </button>

      {/* Location error */}
      {locationError && (
        <div style={{
          position: 'fixed', top: '70px', left: '16px', right: '16px', zIndex: 40,
          background: 'rgba(255,183,3,0.12)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,183,3,0.3)',
          padding: '10px 16px', borderRadius: '12px',
          color: 'rgba(255,220,100,0.9)', fontSize: '13px', textAlign: 'center',
        }}>
          ⚠️ Location access denied — showing default location
        </div>
      )}

      {/* Report form */}
      {reportModalOpen && (
        <ReportForm
          userLocation={userCoords}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  );
}