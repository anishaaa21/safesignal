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

    // Countdown timer
    let remaining = parseInt(duration) * 60;
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setPhase('timeout');
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D0D',
      padding: '24px 16px'
    }}>
      <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        🛡️ Journey Guard
      </h1>
      <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '24px' }}>
        Share your journey — get help if you don't arrive
      </p>

      {/* SETUP PHASE */}
      {phase === 'setup' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#9CA3AF', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Where are you going?
            </label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Home, College, Mall..."
              style={{
                width: '100%', backgroundColor: '#1A1A1A',
                color: 'white', borderRadius: '12px',
                padding: '12px 16px', border: '1px solid #374151',
                outline: 'none', fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#9CA3AF', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              How long will it take? (minutes)
            </label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number" min="1" max="300"
              placeholder="e.g. 30"
              style={{
                width: '100%', backgroundColor: '#1A1A1A',
                color: 'white', borderRadius: '12px',
                padding: '12px 16px', border: '1px solid #374151',
                outline: 'none', fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{
            backgroundColor: '#1E3A5F', borderRadius: '12px',
            padding: '16px', marginBottom: '24px'
          }}>
            <p style={{ color: '#93C5FD', fontSize: '14px' }}>
              ℹ️ If you don't mark your journey complete in time, 
              your trusted contacts will be automatically alerted.
            </p>
          </div>

          <button
            onClick={startJourney}
            style={{
              width: '100%', backgroundColor: '#16A34A',
              color: 'white', fontWeight: 'bold',
              padding: '16px', borderRadius: '16px',
              fontSize: '18px', border: 'none', cursor: 'pointer'
            }}
          >
            🚀 Start Journey
          </button>
        </div>
      )}

      {/* ACTIVE PHASE */}
      {phase === 'active' && (
        <div>
          <div style={{
            backgroundColor: '#052e16', border: '1px solid #16A34A',
            borderRadius: '16px', padding: '24px',
            textAlign: 'center', marginBottom: '16px'
          }}>
            <p style={{ color: '#4ADE80', fontSize: '14px', marginBottom: '8px' }}>
              Journey Active
            </p>
            <p style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>
              → {destination}
            </p>
            <p style={{ color: '#4ADE80', fontSize: '48px', fontWeight: '900' }}>
              {formatTime(timeLeft)}
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '12px' }}>time remaining</p>
          </div>

          <div style={{
            backgroundColor: '#1A1A1A', borderRadius: '12px',
            padding: '16px', marginBottom: '16px'
          }}>
            <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '8px' }}>
              📤 Share this tracking link with your contacts:
            </p>
            <p style={{ color: '#60A5FA', fontSize: '12px', wordBreak: 'break-all', marginBottom: '12px' }}>
              {shareLink}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                alert('✅ Link copied! Share it with your contacts.');
              }}
              style={{
                width: '100%', backgroundColor: '#1D4ED8',
                color: 'white', padding: '10px',
                borderRadius: '10px', border: 'none',
                cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              📋 Copy Link
            </button>
          </div>

          <button
            onClick={() => setPhase('completed')}
            style={{
              width: '100%', backgroundColor: '#16A34A',
              color: 'white', fontWeight: 'bold',
              padding: '16px', borderRadius: '16px',
              fontSize: '18px', border: 'none', cursor: 'pointer'
            }}
          >
            ✅ I Arrived Safely
          </button>
        </div>
      )}

      {/* COMPLETED PHASE */}
      {phase === 'completed' && (
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>✅</div>
          <p style={{ color: '#4ADE80', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            Arrived Safely!
          </p>
          <p style={{ color: '#9CA3AF', marginBottom: '32px' }}>
            Your journey has been completed
          </p>
          <button
            onClick={() => { setPhase('setup'); setDestination(''); setDuration(''); }}
            style={{
              backgroundColor: '#374151', color: 'white',
              padding: '12px 32px', borderRadius: '12px',
              border: 'none', cursor: 'pointer', fontSize: '16px'
            }}
          >
            Start New Journey
          </button>
        </div>
      )}

      {/* TIMEOUT PHASE */}
      {phase === 'timeout' && (
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>⚠️</div>
          <p style={{ color: '#F87171', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            Journey Overdue!
          </p>
          <p style={{ color: '#D1D5DB', marginBottom: '8px' }}>
            Your contacts have been alerted
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '32px' }}>
            If you're safe, mark your journey complete
          </p>
          <button
            onClick={() => setPhase('completed')}
            style={{
              width: '100%', backgroundColor: '#16A34A',
              color: 'white', fontWeight: 'bold',
              padding: '16px', borderRadius: '16px',
              fontSize: '18px', border: 'none', cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            ✅ I'm Safe — Mark Complete
          </button>
        </div>
      )}
    </div>
  );
}