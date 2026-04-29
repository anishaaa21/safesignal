import { createUserProfile } from '../utils/authUtils';
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
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const features = [
    { icon: '🗺️', title: 'Live Risk Map', desc: 'Community-reported danger zones' },
    { icon: '🆘', title: 'One-Tap SOS', desc: 'Alerts contacts instantly' },
    { icon: '🛡️', title: 'Journey Guard', desc: "Auto-alert if you don't arrive" },
  ];

  return (
    <div className="mesh-bg" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>

      {/* Ambient glow orb */}
      <div style={{
        position: 'fixed', top: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,45,85,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '22px',
            background: 'linear-gradient(135deg, #FF2D55, #CC1F3F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 40px rgba(255,45,85,0.4), 0 8px 32px rgba(255,45,85,0.2)',
            animation: 'glowPulse 3s ease-in-out infinite',
            fontSize: '32px',
          }}>
            🛡️
          </div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '42px',
            fontWeight: '800', color: 'white',
            letterSpacing: '-0.02em', lineHeight: 1,
          }}>
            Safe<span style={{ color: 'var(--crimson)' }}>Signal</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '8px', fontSize: '15px' }}>
            Safety that works before you ask
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
          {features.map((f, i) => (
            <div key={i} className="glass" style={{
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: '14px',
              borderLeft: '2px solid rgba(255,45,85,0.4)',
              transition: 'all 0.3s ease',
            }}>
              <span style={{
                fontSize: '26px',
                filter: 'drop-shadow(0 0 10px rgba(255,45,85,0.9))',
                animation: 'glowPulse 2s ease-in-out infinite',
              }}>
                {f.icon}
              </span>
              <div>
                <p style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 600,
                  fontSize: '14px', color: 'white',
                }}>
                  {f.title}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  {f.desc}
                </p>
              </div>
              {/* Glowing dot */}
              <div style={{
                marginLeft: 'auto', width: '7px', height: '7px',
                borderRadius: '50%', background: 'var(--crimson)',
                boxShadow: '0 0 10px var(--crimson), 0 0 20px var(--crimson)',
                animation: 'glowPulse 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>

        {/* Login button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-danger"
          style={{
            width: '100%', padding: '16px',
            fontSize: '16px', color: 'white',
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px',
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '18px', height: '18px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Signing in...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {error && (
          <p style={{
            color: 'var(--crimson)', textAlign: 'center',
            marginTop: '12px', fontSize: '14px',
          }}>
            {error}
          </p>
        )}

        <p style={{
          color: 'rgba(255,255,255,0.2)', fontSize: '11px',
          textAlign: 'center', marginTop: '24px',
        }}>
          🔒 Your location and data are encrypted and private
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}