export default function LoadingScreen({ message = 'Loading SafeSignal...' }) {
  return (
    <div className="mesh-bg" style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%',
          background: 'rgba(255,45,85,0.15)', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
        <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%',
          background: 'rgba(255,45,85,0.1)', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) 0.3s infinite' }} />
        <div style={{ width: '64px', height: '64px', borderRadius: '20px',
          background: 'linear-gradient(135deg, #FF2D55, #CC1F3F)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', position: 'relative', boxShadow: '0 0 40px rgba(255,45,85,0.5)',
          animation: 'glowPulse 2s ease-in-out infinite' }}>🛡️</div>
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
        SafeSignal</h2>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>{message}</p>
      <div style={{ marginTop: '24px', width: '32px', height: '32px',
        border: '2px solid rgba(255,45,85,0.2)', borderTopColor: 'var(--crimson)',
        borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}