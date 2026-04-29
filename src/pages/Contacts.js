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

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontSize: '26px',
          fontWeight: '800', color: 'white', marginBottom: '6px',
        }}>
          👥 Trusted Contacts
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
          These people will be alerted during SOS emergencies
        </p>
      </div>

      <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 700,
          fontSize: '16px', color: 'white', marginBottom: '16px',
        }}>
          + Add Contact
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
          <p style={{ color: 'var(--crimson)', fontSize: '13px', marginTop: '12px' }}>
            ⚠️ {error}
          </p>
        )}
        {success && (
          <p style={{ color: '#00D68F', fontSize: '13px', marginTop: '12px' }}>
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
          }}
        >
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
      </div>

      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
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
        <div>
          <p style={{
            color: 'rgba(255,255,255,0.3)', fontSize: '12px',
            fontFamily: 'Syne', marginBottom: '12px',
          }}>
            {contacts.length}/5 contacts
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {contacts.map((contact, i) => (
              <div key={i} className="glass" style={{
                padding: '14px 16px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
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
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass" style={{ padding: '20px', marginTop: '24px' }}>
        <p style={{
          color: 'white', fontFamily: 'Syne',
          fontWeight: 700, fontSize: '16px', marginBottom: '6px',
        }}>
          📞 Fake Call Escape
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '14px' }}>
          Simulate an incoming call to safely leave a situation
        </p>
        <input
          type="text"
          value={callerName}
          onChange={(e) => setCallerName(e.target.value)}
          placeholder="Caller name (e.g. Mom, Sister)"
          style={{ ...inputStyle, marginBottom: '12px' }}
        />
        <button
          onClick={() => setShowFakeCall(true)}
          style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            border: 'none', borderRadius: '14px',
            color: 'white', fontWeight: 700,
            fontSize: '15px', cursor: 'pointer',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          📞 Start Fake Call
        </button>
      </div>

      <FakeCall
        isVisible={showFakeCall}
        callerName={callerName || 'Mom'}
        onEnd={() => setShowFakeCall(false)}
      />
    </div>
  );
}