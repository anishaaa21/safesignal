import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Map',      path: '/',         icon: '🗺️' },
  { label: 'Report',   path: '/report',   icon: '📍' },
  { label: 'Journey',  path: '/journey',  icon: '🛡️' },
  { label: 'Contacts', path: '/contacts', icon: '👥' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const currentPath = useLocation();

  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      padding: '8px 16px 20px',
      background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {tabs.map((tab) => {
          const isActive = currentPath.pathname === tab.path;
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              padding: '8px 16px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: isActive ? 'rgba(255,45,85,0.12)' : 'transparent',
              minWidth: '60px',
            }}>
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{tab.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400,
                fontFamily: 'Syne, sans-serif',
                color: isActive ? 'var(--crimson)' : 'rgba(255,255,255,0.3)',
                transition: 'color 0.2s' }}>
                {tab.label}
              </span>
              {isActive && (
                <div style={{ width: '4px', height: '4px', borderRadius: '50%',
                  background: 'var(--crimson)', boxShadow: '0 0 8px var(--crimson)', marginTop: '-2px' }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}