import { useState } from 'react';

const INCIDENT_TYPES = [
  { label: '😰 Harassment', value: 'Harassment' },
  { label: '💡 Poor Lighting', value: 'Poor Lighting' },
  { label: '🚨 Unsafe Area', value: 'Unsafe Area' },
  { label: '📱 Theft', value: 'Theft' },
  { label: '👁️ Stalking', value: 'Stalking' },
  { label: '⚠️ Other', value: 'Other' },
];

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 20) return 'evening';
  return 'night';
}

export default function ReportForm({ userLocation, onClose }) {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) { setError('Please select an incident type'); return; }
    if (!userLocation) { setError('Location not available yet'); return; }

    setLoading(true);
    setError('');

    try {
      const { db, auth } = await import('../firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

      await addDoc(collection(db, 'reports'), {
        userId: auth.currentUser?.uid || 'anonymous',
        location: userLocation,
        incidentType: selectedType,
        description: description.trim(),
        timeOfDay: getTimeOfDay(),
        upvotes: 0,
        downvotes: 0,
        timestamp: serverTimestamp(),
      });

      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      display: 'flex', alignItems: 'flex-end',
    }}>

      {/* Bottom sheet */}
      <div style={{
        width: '100%',
        background: 'rgba(10,10,15,0.98)',
        backdropFilter: 'blur(30px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '28px 28px 0 0',
        padding: '24px 20px 40px',
        minHeight: '100vh',
        overflowY: 'auto',
      }}>

        {/* Handle bar */}
        <div style={{
          width: '40px', height: '4px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '2px', margin: '0 auto 20px',
        }} />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '20px',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '22px',
              fontWeight: '800', color: 'white',
            }}>
              Report Incident
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '2px' }}>
              Help keep the community safe
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.6)', fontSize: '18px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              fontSize: '56px', marginBottom: '16px',
              filter: 'drop-shadow(0 0 20px rgba(0,214,143,0.8))',
            }}>
              ✅
            </div>
            <p style={{
              fontFamily: 'Syne', fontSize: '22px',
              fontWeight: 'bold', color: '#00D68F',
            }}>
              Report Submitted!
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>
              Thank you for keeping the community safe
            </p>
          </div>
        ) : (
          <>
            {/* Incident type grid */}
            <p style={{
              color: 'rgba(255,255,255,0.4)', fontSize: '12px',
              fontFamily: 'Syne', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '12px',
            }}>
              What happened?
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '8px', marginBottom: '20px',
            }}>
              {INCIDENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => { setSelectedType(type.value); setError(''); }}
                  style={{
                    padding: '12px', borderRadius: '14px',
                    border: selectedType === type.value
                      ? '1px solid rgba(255,45,85,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: selectedType === type.value
                      ? 'rgba(255,45,85,0.12)'
                      : 'rgba(255,255,255,0.04)',
                    color: selectedType === type.value
                      ? 'white' : 'rgba(255,255,255,0.55)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px', fontWeight: 500,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedType === type.value
                      ? '0 0 20px rgba(255,45,85,0.15)' : 'none',
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Description */}
            <p style={{
              color: 'rgba(255,255,255,0.4)', fontSize: '12px',
              fontFamily: 'Syne', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '10px',
            }}>
              Description (optional)
            </p>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what happened..."
              rows={3}
              maxLength={300}
              style={{
                width: '100%', padding: '14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', color: 'white',
                fontSize: '14px', fontFamily: 'DM Sans, sans-serif',
                resize: 'none', outline: 'none',
                boxSizing: 'border-box', marginBottom: '16px',
                transition: 'border-color 0.2s',
              }}
            />

            {/* Location pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(0,214,143,0.06)',
              border: '1px solid rgba(0,214,143,0.15)',
              borderRadius: '12px', padding: '10px 14px',
              marginBottom: '20px',
            }}>
              <span style={{
                fontSize: '18px',
                filter: 'drop-shadow(0 0 8px rgba(0,214,143,0.8))',
              }}>
                📍
              </span>
              <div>
                <p style={{
                  color: 'rgba(0,214,143,0.9)', fontSize: '12px',
                  fontFamily: 'Syne', fontWeight: 600,
                }}>
                  Your current location
                </p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                  {userLocation
                    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                    : 'Detecting...'}
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p style={{
                color: 'var(--crimson)', fontSize: '13px',
                marginBottom: '12px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                ⚠️ {error}
              </p>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !selectedType}
              className="btn-danger"
              style={{
                width: '100%', padding: '16px',
                border: 'none', color: 'white', cursor: 'pointer',
                fontSize: '16px', opacity: loading || !selectedType ? 0.6 : 1,
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
                  Submitting...
                </>
              ) : (
                <>
                  <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' }}>
                    🚨
                  </span>
                  Submit Report
                </>
              )}
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}