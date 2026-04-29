import { useState, useEffect } from 'react';
import { auth } from '../firebase';

export default function SOSButton({ userLocation }) {
  const [phase, setPhase] = useState('idle');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (phase === 'confirming' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === 'confirming' && countdown === 0) {
      setPhase('sent');
      setTimeout(() => {
        setPhase('idle');
        setCountdown(3);
      }, 5000);
    }
  }, [phase, countdown]);

  const handleSOSPress = () => {
    if (phase !== 'idle') return;
    setPhase('confirming');
    setCountdown(3);
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  const cancelSOS = () => {
    setPhase('idle');
    setCountdown(3);
  };

  // IDLE — red floating button
  if (phase === 'idle') {
    return (
      <button
        onClick={handleSOSPress}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '16px',
          zIndex: 1000,
          width: '64px',
          height: '64px',
          backgroundColor: '#DC2626',
          color: 'white',
          fontWeight: '900',
          fontSize: '14px',
          borderRadius: '50%',
          border: '3px solid #FCA5A5',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)',
        }}
      >
        SOS
      </button>
    );
  }

  // CONFIRMING — countdown overlay
  if (phase === 'confirming') {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(127, 29, 29, 0.97)',
        zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '96px', fontWeight: '900',
          color: 'white', marginBottom: '16px'
        }}>
          {countdown}
        </div>
        <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          Sending SOS Alert
        </p>
        <p style={{ color: '#FCA5A5', marginBottom: '48px', textAlign: 'center', padding: '0 32px' }}>
          Your trusted contacts will be notified
        </p>
        <button
          onClick={cancelSOS}
          style={{
            backgroundColor: 'white', color: '#DC2626',
            fontWeight: 'bold', padding: '16px 48px',
            borderRadius: '16px', fontSize: '20px',
            border: 'none', cursor: 'pointer'
          }}
        >
          CANCEL
        </button>
      </div>
    );
  }

  // SENT — success screen
  if (phase === 'sent') {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#0D0D0D',
        zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>✅</div>
        <p style={{ color: '#4ADE80', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
          Help is Coming
        </p>
        <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '0 32px' }}>
          Your contacts have been alerted with your location
        </p>
      </div>
    );
  }
}