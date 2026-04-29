import { useState } from 'react';

export default function SOSButton({ userLocation }) {
  const [phase, setPhase] = useState('idle');
  const [countdown, setCountdown] = useState(3);

  const handleSOSPress = () => {
    if (phase !== 'idle') return;
    setPhase('confirming');
    setCountdown(3);
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        setPhase('sent');
        setTimeout(() => { setPhase('idle'); setCountdown(3); }, 5000);
      }
    }, 1000);
  };

  const cancelSOS = () => { setPhase('idle'); setCountdown(3); };

  if (phase === 'idle') return (
    <button onClick={handleSOSPress} style={{
      position: 'fixed', bottom: '90px', right: '16px', zIndex: 1000,
      width: '64px', height: '64px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF2D55, #CC1F3F)',
      color: 'white', fontFamily: 'Syne, sans-serif',
      fontWeight: '900', fontSize: '13px',
      border: '2px solid rgba(255,100,120,0.4)', cursor: 'pointer',
      animation: 'glowPulse 2s ease-in-out infinite',
      boxShadow: '0 0 30px rgba(255,45,85,0.6), 0 4px 15px rgba(255,45,85,0.4)',
    }}>SOS</button>
  );

  if (phase === 'confirming') return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(10,0,5,0.97)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div style={{ position: 'absolute', inset: '-24px', borderRadius: '50%',
          background: 'rgba(255,45,85,0.15)', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
        <div style={{ width: '100px', height: '100px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF2D55, #CC1F3F)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '96px', fontFamily: 'Syne, sans-serif', fontWeight: '900', color: 'white',
          boxShadow: '0 0 60px rgba(255,45,85,0.8)' }}>
          {countdown}
        </div>
      </div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
        Sending SOS Alert</p>
      <p style={{ color: 'rgba(255,150,165,0.8)', marginBottom: '48px', textAlign: 'center', padding: '0 32px', fontSize: '14px' }}>
        Your trusted contacts will be notified with your live location</p>
      <button onClick={cancelSOS} style={{
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)', color: 'white',
        fontFamily: 'Syne, sans-serif', fontWeight: 'bold',
        padding: '16px 48px', borderRadius: '50px', fontSize: '18px', cursor: 'pointer' }}>
        CANCEL
      </button>
    </div>
  );

  if (phase === 'sent') return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%',
        background: 'rgba(0,214,143,0.15)', border: '2px solid rgba(0,214,143,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '40px', marginBottom: '24px', boxShadow: '0 0 40px rgba(0,214,143,0.3)' }}>✅</div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#00D68F', marginBottom: '12px' }}>
        Help is Coming</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 32px', fontSize: '14px' }}>
        Your contacts have been alerted with your live location</p>
    </div>
  );
}