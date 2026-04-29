import { useState } from 'react';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = () => {
    if (!name.trim()) { setError('Please enter a name'); return; }
    if (!email.trim()) { setError('Please enter an email'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email'); return; }
    if (contacts.length >= 5) { setError('Maximum 5 contacts allowed'); return; }
    
    const already = contacts.find(c => c.email === email);
    if (already) { setError('This contact is already added'); return; }

    setContacts([...contacts, { name: name.trim(), email: email.trim(), phone: phone.trim() }]);
    setName('');
    setEmail('');
    setPhone('');
    setError('');
    setSuccess('Contact added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRemove = (emailToRemove) => {
    setContacts(contacts.filter(c => c.email !== emailToRemove));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D0D',
      padding: '24px 16px'
    }}>
      <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
        👥 Trusted Contacts
      </h1>
      <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '24px' }}>
        These people will be alerted during SOS emergencies
      </p>

      {/* Add contact form */}
      <div style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
          + Add Contact
        </h2>

        <input
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          placeholder="Full Name *"
          style={{
            width: '100%', backgroundColor: '#242424',
            color: 'white', borderRadius: '10px',
            padding: '12px', border: '1px solid #374151',
            outline: 'none', fontSize: '15px',
            marginBottom: '10px', boxSizing: 'border-box'
          }}
        />

        <input
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          placeholder="Email Address *"
          type="email"
          style={{
            width: '100%', backgroundColor: '#242424',
            color: 'white', borderRadius: '10px',
            padding: '12px', border: '1px solid #374151',
            outline: 'none', fontSize: '15px',
            marginBottom: '10px', boxSizing: 'border-box'
          }}
        />

        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number (optional)"
          type="tel"
          style={{
            width: '100%', backgroundColor: '#242424',
            color: 'white', borderRadius: '10px',
            padding: '12px', border: '1px solid #374151',
            outline: 'none', fontSize: '15px',
            marginBottom: '12px', boxSizing: 'border-box'
          }}
        />

        {/* Error message */}
        {error && (
          <p style={{ color: '#F87171', fontSize: '13px', marginBottom: '10px' }}>
            ⚠️ {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p style={{ color: '#4ADE80', fontSize: '13px', marginBottom: '10px' }}>
            ✅ {success}
          </p>
        )}

        <button
          onClick={handleAdd}
          style={{
            width: '100%', backgroundColor: '#DC2626',
            color: 'white', fontWeight: 'bold',
            padding: '14px', borderRadius: '12px',
            fontSize: '16px', border: 'none', cursor: 'pointer'
          }}
        >
          Add Contact
        </button>
      </div>

      {/* Contact list */}
      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '32px' }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>👤</p>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>No contacts added yet</p>
          <p style={{ color: '#4B5563', fontSize: '13px', marginTop: '4px' }}>
            Add contacts above to enable SOS alerts
          </p>
        </div>
      ) : (
        <div>
          <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '12px' }}>
            {contacts.length}/5 contacts added
          </p>
          {contacts.map((contact, i) => (
            <div key={i} style={{
              backgroundColor: '#1A1A1A',
              borderRadius: '14px',
              padding: '14px 16px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px',
                  backgroundColor: '#7F1D1D',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 'bold', fontSize: '18px'
                }}>
                  {contact.name[0].toUpperCase()}
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>
                    {contact.name}
                  </p>
                  <p style={{ color: '#9CA3AF', fontSize: '13px' }}>{contact.email}</p>
                  {contact.phone && (
                    <p style={{ color: '#6B7280', fontSize: '12px' }}>{contact.phone}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemove(contact.email)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontSize: '20px', padding: '4px'
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}