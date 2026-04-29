import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { runSeed } from './utils/seedData';

function SplashScreen() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#030712' }}>
      <p style={{ color: '#9ca3af' }}>Loading SafeSignal...</p>
    </div>
  );
}

function AuthenticatedApp() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Navbar />
    </div>
  );
}

function App() {
  useEffect(() => { runSeed(); }, []);
  const [currentUser, authLoading] = useAuthState(auth);

  if (authLoading) return <SplashScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={currentUser ? <AuthenticatedApp /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;