import { useState } from 'react';

export default function Journey() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [phase, setPhase] = useState('setup');
  const [shareLink, setShareLink] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const startJourney = () => {
    if (!destination.trim()) { alert('Please enter a destination'); return; }
    if (!duration || parseInt(duration) < 1) { alert('Please enter travel time'); return; }

    const token = Math.random().toString(36).substring(2, 12);
    const link = `${window.location.origin}/track/${token}`;
    setShareLink(link);
    setTimeLeft(parseInt(duration) * 60);
    setPhase('active');

    let remaining = parseInt(duration) * 60;
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) { clearInterval(interval); setPhase('timeout'); }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px', color: 'white',
    fontSize: '15px', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    color: 'rgba(255,255,255,0.4)', fontSize: '12px',
    fontFamily: 'Syne, sans-serif', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    display: 'block', marginBottom: '8px',
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', padding: '24px 16px' }}>

      <div style={{
        position: 'fixed', top: '-10%', right: '-20%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,214,143,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{ fontSize: '28px', filter: 'drop-shadow(0 0 12px rgba(0,214,143,0.9))' }}>🛡️</span>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: '800', color: 'white' }}>
              Journey Guard
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', paddingLeft: '40px' }}>
            Share your journey — get help if you don't arrive
          </p>
        </div>

        {/* SETUP */}
        {phase === 'setup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass" style={{ padding: '16px' }}>
              <label style={labelStyle}>📍 Destination</label>
              <input value={destination} onChange={e => setDestination(e.target.value)}
                placeholder="e.g. Home, College, Mall..." style={inputStyle} />
            </div>

            <div className="glass" style={{ padding: '16px' }}>
              <label style={labelStyle}>⏱️ Travel Time (minutes)</label>
              <input value={duration} onChange={e => setDuration(e.target.value)}
                type="number" min="1" max="300" placeholder="e.g. 30" style={inputStyle} />
            </div>

            <div style={{
              background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.15)',
              borderRadius: '16px', padding: '16px',
            }}>
              <p style={{ color: 'rgba(0,214,143,0.8)', fontSize: '12px', fontFamily: 'Syne',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                How it works
              </p>
              {[
                { icon: '🚀', text: 'Start your journey with a destination' },
                { icon: '📤', text: 'Share live tracking link with contacts' },
                { icon: '✅', text: 'Mark complete when you arrive safely' },
                { icon: '🆘', text: 'Contacts auto-alerted if overdue' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 3 ? '8px' : 0 }}>
                  <span style={{ fontSize: '16px', filter: 'drop-shadow(0 0 6px rgba(0,214,143,0.6))' }}>{step.icon}</span>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{step.text}</p>
                </div>
              ))}
            </div>

            <button onClick={startJourney} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #00D68F, #00A86B)',
              color: 'white', fontFamily: 'Syne', fontWeight: '700', fontSize: '16px',
              border: 'none', borderRadius: '16px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,214,143,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}>🚀</span>
              Start Journey
            </button>
          </div>
        )}

        {/* ACTIVE */}
        {phase === 'active' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.2)',
              borderRadius: '20px', padding: '28px', textAlign: 'center',
              boxShadow: '0 0 40px rgba(0,214,143,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D68F',
                  boxShadow: '0 0 10px #00D68F', animation: 'glowPulse 1.5s ease-in-out infinite' }} />
                <p style={{ color: 'rgba(0,214,143,0.8)', fontSize: '12px', fontFamily: 'Syne',
                  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Journey Active</p>
              </div>
              <p style={{ color: 'white', fontSize: '20px', fontFamily: 'Syne', fontWeight: 700, marginBottom: '16px' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>→ </span>{destination}
              </p>
              <p style={{ color: '#00D68F', fontSize: '64px', fontFamily: 'Syne', fontWeight: '900',
                lineHeight: 1, textShadow: '0 0 30px rgba(0,214,143,0.5)' }}>
                {formatTime(timeLeft)}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '8px' }}>time remaining</p>
            </div>

            <div className="glass" style={{ padding: '16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Syne',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ filter: 'drop-shadow(0 0 6px rgba(100,160,255,0.8))' }}>📤</span>
                Share Tracking Link
              </p>
              <p style={{ color: 'rgba(100,160,255,0.7)', fontSize: '12px', wordBreak: 'break-all',
                marginBottom: '12px', lineHeight: 1.6,
                background: 'rgba(100,130,255,0.06)', padding: '10px 12px', borderRadius: '10px',
                border: '1px solid rgba(100,130,255,0.12)' }}>
                {shareLink}
              </p>
              <button onClick={() => { navigator.clipboard.writeText(shareLink); alert('✅ Link copied!'); }}
                style={{ width: '100%', padding: '12px', background: 'rgba(100,130,255,0.12)',
                  border: '1px solid rgba(100,130,255,0.2)', borderRadius: '12px',
                  color: 'rgba(150,180,255,0.9)', fontFamily: 'Syne', fontWeight: 600,
                  fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px' }}>
                <span style={{ filter: 'drop-shadow(0 0 6px rgba(150,180,255,0.8))' }}>📋</span>
                Copy Link
              </button>
            </div>

            <button onClick={() => setPhase('completed')} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #00D68F, #00A86B)',
              color: 'white', fontFamily: 'Syne', fontWeight: '700', fontSize: '16px',
              border: 'none', borderRadius: '16px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,214,143,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' }}>✅</span>
              I Arrived Safely
            </button>
          </div>
        )}

        {/* COMPLETED */}
        {phase === 'completed' && (
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '28px',
              background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '40px', margin: '0 auto 24px',
              boxShadow: '0 0 50px rgba(0,214,143,0.25)',
              filter: 'drop-shadow(0 0 16px rgba(0,214,143,0.6))' }}>✅</div>
            <p style={{ fontFamily: 'Syne', fontSize: '30px', fontWeight: 'bold', color: '#00D68F',
              marginBottom: '12px', textShadow: '0 0 20px rgba(0,214,143,0.4)' }}>Arrived Safely!</p>
            <p style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '40px', fontSize: '15px' }}>
              Your journey has been completed</p>
            <button onClick={() => { setPhase('setup'); setDestination(''); setDuration(''); }}
              className="glass" style={{ padding: '14px 36px', color: 'white',
                fontFamily: 'Syne', fontWeight: 600, fontSize: '15px', border: 'none', cursor: 'pointer' }}>
              Start New Journey
            </button>
          </div>
        )}

        {/* TIMEOUT */}
        {phase === 'timeout' && (
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '28px',
              background: 'rgba(255,183,3,0.1)', border: '1px solid rgba(255,183,3,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '40px', margin: '0 auto 24px',
              boxShadow: '0 0 50px rgba(255,183,3,0.2)',
              filter: 'drop-shadow(0 0 16px rgba(255,183,3,0.5))' }}>⚠️</div>
            <p style={{ fontFamily: 'Syne', fontSize: '30px', fontWeight: 'bold', color: '#FFB703',
              marginBottom: '12px', textShadow: '0 0 20px rgba(255,183,3,0.4)' }}>Journey Overdue!</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '8px', fontSize: '15px' }}>
              Your contacts have been alerted</p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginBottom: '40px' }}>
              If you're safe, mark your journey complete</p>
            <button onClick={() => setPhase('completed')} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #00D68F, #00A86B)',
              color: 'white', fontFamily: 'Syne', fontWeight: '700', fontSize: '16px',
              border: 'none', borderRadius: '16px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,214,143,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' }}>✅</span>
              I'm Safe — Mark Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}