import ReportForm from '../components/ReportForm';
import useUserLocation from '../hooks/useUserLocation';
import { useNavigate } from 'react-router-dom';

export default function ReportPage() {
  const { location: userCoords } = useUserLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050508' }}>
      <ReportForm
        userLocation={userCoords}
        onClose={() => navigate('/')}
      />
    </div>
  );
}