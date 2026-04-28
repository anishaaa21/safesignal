import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0D0D0D',
      padding: '24px'
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px',
          backgroundColor: '#DC2626',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '32px'
        }}>
          🛡️
        </div>
        <h1 style={{ color: 'white', fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>
          SafeSignal
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '16px' }}>
          Safety that works before you ask
        </p>
      </div>

      {/* Feature cards */}
      <div style={{ width: '100%', maxWidth: '360px', marginBottom: '32px' }}>
        {[
          { icon: '🗺️', text: 'Live risk zone heatmap' },
          { icon: '🆘', text: 'One-tap SOS alerts' },
          { icon: '🛡️', text: 'Journey safety guard' },
        ].map((item) => (
          <div key={item.text} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{ color: '#D1D5DB' }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Login button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          width: '100%', maxWidth: '360px',
          backgroundColor: loading ? '#4B5563' : '#DC2626',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '16px',
          fontSize: '18px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '⏳ Signing in...' : '🔐 Sign in with Google'}
      </button>

      {error && (
        <p style={{ color: '#F87171', marginTop: '16px', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <p style={{ color: '#4B5563', fontSize: '12px', marginTop: '32px', textAlign: 'center' }}>
        Your location and data are kept private and secure
      </p>
    </div>
  );
}