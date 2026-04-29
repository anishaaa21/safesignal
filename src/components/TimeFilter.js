const timeOptions = [
  { label: 'All',     value: 'all',     emoji: '🌐' },
  { label: 'Day',     value: 'morning', emoji: '🌅' },
  { label: 'Evening', value: 'evening', emoji: '🌆' },
  { label: 'Night',   value: 'night',   emoji: '🌙' },
];

export default function TimeFilter({ active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '6px', padding: '6px',
      background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)', borderRadius: '50px',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      {timeOptions.map((option) => {
        const isActive = active === option.value;
        return (
          <button key={option.value} onClick={() => onChange(option.value)} style={{
            padding: '6px 14px', borderRadius: '50px', border: 'none', cursor: 'pointer',
            fontSize: '12px', fontFamily: 'Syne, sans-serif', fontWeight: 600,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            background: isActive ? 'var(--crimson)' : 'transparent',
            color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
            boxShadow: isActive ? '0 0 20px rgba(255,45,85,0.35)' : 'none',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <span>{option.emoji}</span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}