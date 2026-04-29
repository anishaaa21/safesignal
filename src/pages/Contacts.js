import { useState, useEffect } from 'react';
import FakeCall from '../components/FakeCall';
import { addTrustedContact, removeTrustedContact, getTrustedContacts } from '../utils/firestoreUtils';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [callerName, setCallerName] = useState('Mom');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const c = await getTrustedContacts();
    setContacts(c);
  };

  const handleAdd = async () => {
    if (!name.trim()) { setError('Please enter a name'); return; }
    if (!email.trim()) { setError('Please enter an email'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email'); return; }
    if (contacts.length >= 5) { setError('Maximum 5 contacts allowed'); return; }

    setLoading(true);
    setError('');

    const result = await addTrustedContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    });

    setLoading(false);

    if (result.success) {
      setName(''); setEmail(''); setPhone('');
      setSuccess('Contact added!');
      setTimeout(() => setSuccess(''), 3000);
      await loadContacts();
    } else {
      setError(result.error);
    }
  };

  const handleRemove = async (emailToRemove) => {
    await removeTrustedContact(emailToRemove);
    await loadContacts();
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

      {/* Ambient orb */}
      <div style={{
        position: 'fixed', top: '-10%', right: '-20%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,45,85,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{
              fontSize: '28px',
              filter: 'drop-shadow(0 0 12px rgba(255,45,85,0.9))',
            }}>
              👥
            </span>
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '26px',
              fontWeight: '800', color: 'white',
            }}>
              Trusted Contacts
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', paddingLeft: '40px' }}>
            These people will be alerted during SOS emergencies
          </p>
        </div>

        {/* Add contact form */}
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 700,
            fontSize: '16px', color: 'white', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,45,85,0.8))' }}>➕</span>
            Add Contact
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder="e.g. Priya Sharma"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="e.g. priya@gmail.com"
                type="email"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone (optional)</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                type="tel"
                style={inputStyle}
              />
            </div>
          </div>

          {error && (
            <p style={{
              color: 'var(--crimson)', fontSize: '13px',
              marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              ⚠️ {error}
            </p>
          )}
          {success && (
            <p style={{
              color: '#00D68F', fontSize: '13px',
              marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              ✅ {success}
            </p>
          )}

          <button
            onClick={handleAdd}
            disabled={loading}
            className="btn-danger"
            style={{
              width: '100%', padding: '14px',
              border: 'none', color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '15px', marginTop: '16px',
              opacity: loading ? 0.7 : 1,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
            }}
          >
            <span style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}>
              {loading ? '⏳' : '✚'}
            </span>
            {loading ? 'Adding...' : 'Add Contact'}
          </button>
        </div>

        {/* Contact list */}
        {contacts.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 16px',
            }}>
              👤
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
              No contacts added yet
            </p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '6px' }}>
              Add contacts above to enable SOS alerts
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.3)', fontSize: '12px',
              fontFamily: 'Syne', marginBottom: '12px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#00D68F',
                boxShadow: '0 0 8px #00D68F',
                display: 'inline-block',
              }} />
              {contacts.length}/5 contacts active
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contacts.map((contact, i) => (
                <div key={i} className="glass" style={{
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  borderLeft: '2px solid rgba(255,45,85,0.3)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '14px',
                      background: 'linear-gradient(135deg, #FF2D55, #CC1F3F)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontFamily: 'Syne',
                      fontWeight: 'bold', fontSize: '18px',
                      boxShadow: '0 0 20px rgba(255,45,85,0.3)',
                    }}>
                      {contact.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{
                        color: 'white', fontFamily: 'Syne',
                        fontWeight: 600, fontSize: '15px',
                      }}>
                        {contact.name}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                        {contact.email}
                      </p>
                      {contact.phone && (
                        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                          {contact.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(contact.email)}
                    style={{
                      background: 'rgba(255,45,85,0.1)',
                      border: '1px solid rgba(255,45,85,0.2)',
                      borderRadius: '10px', padding: '8px',
                      cursor: 'pointer', fontSize: '16px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fake Call Section */}
        <div style={{
          background: 'rgba(100,130,255,0.06)',
          border: '1px solid rgba(100,130,255,0.15)',
          borderRadius: '20px', padding: '20px',
          position: 'relative', overflow: 'hidden',
          marginBottom: '24px',
        }}>

          {/* Ambient orb */}
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,130,255,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '10px', marginBottom: '6px',
          }}>
            <span style={{
              fontSize: '22px',
              filter: 'drop-shadow(0 0 12px rgba(100,160,255,0.9))',
              animation: 'glowPulse 2s ease-in-out infinite',
            }}>
              📞
            </span>
            <p style={{
              color: 'white', fontFamily: 'Syne',
              fontWeight: 700, fontSize: '17px',
            }}>
              Fake Call Escape
            </p>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.35)', fontSize: '13px',
            marginBottom: '16px', paddingLeft: '32px', lineHeight: 1.5,
          }}>
            Simulate an incoming call to safely leave a situation
          </p>

          {/* Step pills */}
          <div style={{
            display: 'flex', gap: '8px',
            flexWrap: 'wrap', marginBottom: '16px',
          }}>
            {[
              { icon: '1️⃣', text: 'Enter name' },
              { icon: '2️⃣', text: 'Start call' },
              { icon: '3️⃣', text: 'Walk away safely' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(100,130,255,0.08)',
                border: '1px solid rgba(100,130,255,0.15)',
                borderRadius: '50px', padding: '5px 12px',
              }}>
                <span style={{ fontSize: '13px' }}>{step.icon}</span>
                <span style={{
                  color: 'rgba(150,180,255,0.7)', fontSize: '11px',
                  fontFamily: 'Syne', fontWeight: 600,
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Caller name input */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              color: 'rgba(150,180,255,0.6)', fontSize: '12px',
              fontFamily: 'Syne', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              display: 'block', marginBottom: '8px',
            }}>
              Caller Name
            </label>
            <input
              type="text"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              placeholder="e.g. Mom, Sister, Friend..."
              style={{
                ...inputStyle,
                border: '1px solid rgba(100,130,255,0.2)',
                background: 'rgba(100,130,255,0.06)',
              }}
            />
          </div>

          {/* Start button */}
          <button
            onClick={() => setShowFakeCall(true)}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, rgba(100,130,255,0.9), rgba(80,100,220,0.9))',
              border: '1px solid rgba(100,130,255,0.3)',
              borderRadius: '14px', color: 'white',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700, fontSize: '15px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(100,130,255,0.25)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{
              fontSize: '18px',
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))',
            }}>
              📞
            </span>
            Start Fake Call
          </button>
        </div>

      </div>

      <FakeCall
        isVisible={showFakeCall}
        callerName={callerName || 'Mom'}
        onEnd={() => setShowFakeCall(false)}
      />
    </div>
  );
}