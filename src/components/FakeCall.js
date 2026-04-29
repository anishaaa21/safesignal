import { useState, useEffect, useRef } from 'react';

export default function FakeCall({ isVisible, callerName = 'Mom', onEnd }) {
  const [callAnswered, setCallAnswered] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const durationTimerRef = useRef(null);
  const ringTimerRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      setCallAnswered(false);
      setCallDuration(0);
      clearInterval(durationTimerRef.current);
      clearInterval(ringTimerRef.current);
      return;
    }
    if (navigator.vibrate) {
      ringTimerRef.current = setInterval(() => {
        navigator.vibrate(1000);
      }, 2000);
    }
    return () => {
      clearInterval(durationTimerRef.current);
      clearInterval(ringTimerRef.current);
      if (navigator.vibrate) navigator.vibrate(0);
    };
  }, [isVisible]);

  useEffect(() => {
    if (callAnswered) {
      clearInterval(ringTimerRef.current);
      if (navigator.vibrate) navigator.vibrate(0);
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(durationTimerRef.current);
  }, [callAnswered]);

  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => setCallAnswered(true);

  const handleEnd = () => {
    clearInterval(durationTimerRef.current);
    clearInterval(ringTimerRef.current);
    if (navigator.vibrate) navigator.vibrate(0);
    setCallAnswered(false);
    setCallDuration(0);
    onEnd();
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(5,5,8,0.97)',
      backdropFilter: 'blur(30px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '60px 32px',
    }}>

      {/* Ambient orb */}
      <div style={{
        position: 'fixed', top: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '400px', height: '400px', borderRadius: '50%',
        background: callAnswered
          ? 'radial-gradient(circle, rgba(0,214,143,0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255,45,85,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', transition: 'all 1s ease',
      }} />

      {/* TOP — caller info */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Avatar with pulsing rings */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          {!callAnswered && (
            <>
              <div style={{
                position: 'absolute', inset: '-20px', borderRadius: '50%',
                border: '1px solid rgba(255,45,85,0.2)',
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
              }} />
              <div style={{
                position: 'absolute', inset: '-10px', borderRadius: '50%',
                border: '1px solid rgba(255,45,85,0.15)',
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) 0.4s infinite',
              }} />
            </>
          )}
          <div style={{
            width: '110px', height: '110px', borderRadius: '50%',
            background: callAnswered
              ? 'linear-gradient(135deg, rgba(0,214,143,0.2), rgba(0,168,107,0.1))'
              : 'linear-gradient(135deg, rgba(255,45,85,0.15), rgba(100,0,50,0.1))',
            border: callAnswered
              ? '2px solid rgba(0,214,143,0.4)'
              : '2px solid rgba(255,45,85,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
            fontSize: '48px',
            boxShadow: callAnswered
              ? '0 0 40px rgba(0,214,143,0.3)'
              : '0 0 40px rgba(255,45,85,0.2)',
            transition: 'all 0.5s ease',
            filter: callAnswered
              ? 'drop-shadow(0 0 16px rgba(0,214,143,0.6))'
              : 'drop-shadow(0 0 16px rgba(255,45,85,0.4))',
          }}>
            👤
          </div>
        </div>

        {/* Status */}
        <p style={{
          fontSize: '14px', marginBottom: '8px',
          fontFamily: 'Syne, sans-serif', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: callAnswered ? 'rgba(0,214,143,0.8)' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.5s ease',
        }}>
          {callAnswered ? '● Connected' : 'Incoming Call...'}
        </p>

        {/* Caller name */}
        <p style={{
          color: 'white', fontSize: '36px',
          fontFamily: 'Syne, sans-serif', fontWeight: '800',
          marginBottom: '16px', letterSpacing: '-0.02em',
        }}>
          {callerName}
        </p>

        {/* Duration or bouncing dots */}
        {callAnswered ? (
          <p style={{
            color: '#00D68F', fontSize: '24px',
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            textShadow: '0 0 20px rgba(0,214,143,0.5)',
          }}>
            {formatDuration(callDuration)}
          </p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {[0, 150, 300].map((delay, i) => (
              <div key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--crimson)',
                boxShadow: '0 0 8px var(--crimson)',
                animation: `bounce 1s ease-in-out ${delay}ms infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* MIDDLE — hint when answered */}
      {callAnswered && (
        <div className="glass" style={{
          padding: '14px 24px', textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            SafeSignal Fake Call
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '4px' }}>
            Use this time to safely leave the situation
          </p>
        </div>
      )}

      {/* BOTTOM — buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Accept button */}
        {!callAnswered && (
          <button
            onClick={handleAnswer}
            style={{
              width: '100%', padding: '18px',
              background: 'linear-gradient(135deg, #00D68F, #00A86B)',
              color: 'white', fontFamily: 'Syne, sans-serif',
              fontWeight: '700', fontSize: '18px',
              border: 'none', borderRadius: '18px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0,214,143,0.4)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '12px',
            }}
          >
            <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))', fontSize: '22px' }}>
              📞
            </span>
            Accept
          </button>
        )}

        {/* End / Decline button */}
        <button
          onClick={handleEnd}
          className="btn-danger"
          style={{
            width: '100%', padding: '18px',
            border: 'none', color: 'white',
            fontFamily: 'Syne, sans-serif',
            fontWeight: '700', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px',
          }}
        >
          <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))', fontSize: '22px' }}>
            📵
          </span>
          {callAnswered ? 'End Call' : 'Decline'}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}