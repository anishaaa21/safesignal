import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Login from './pages/Login';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Contacts from './pages/Contacts';
import TrackPage from './pages/TrackPage';

import Navbar from './components/Navbar';
import SOSButton from './components/SOSButton';
import ToastContainer from './components/Toast';
import LoadingScreen from './components/LoadingScreen';

import useUserLocation from './hooks/useUserLocation';

function AuthenticatedApp() {
  const { location } = useUserLocation();

  return (
    <div className="relative">
      <ToastContainer />
      <SOSButton userLocation={location} />
      <div className="pb-20 page-enter">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/journey"  element={<Journey />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*"         element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/track/:token" element={<TrackPage />} />
        <Route
          path="/*"
          element={user ? <AuthenticatedApp /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;