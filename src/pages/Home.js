import MapView from '../components/MapView';
import useUserLocation from '../hooks/useUserLocation';

export default function Home() {
  const { location: userCoords, error: locationError } = useUserLocation();

  return (
    <div style={{ position: 'relative' }}>
      <MapView userLocation={userCoords} />

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
    </div>
  );
}