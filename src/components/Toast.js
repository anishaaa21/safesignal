import { useState, useEffect } from 'react';

let showToastFn = null;

export const showToast = (message, type = 'info') => {
  if (showToastFn) showToastFn(message, type);
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToastFn = (message, type) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    };
  }, []);

  const config = {
    danger:  { bg: 'rgba(255,45,85,0.15)',   border: 'rgba(255,45,85,0.3)',   icon: '🚨' },
    success: { bg: 'rgba(0,214,143,0.12)',   border: 'rgba(0,214,143,0.25)',  icon: '✅' },
    warning: { bg: 'rgba(255,183,3,0.12)',   border: 'rgba(255,183,3,0.25)',  icon: '⚠️' },
    info:    { bg: 'rgba(100,130,255,0.12)', border: 'rgba(100,130,255,0.2)', icon: 'ℹ️' },
  };

  return (
    <div style={{ position: 'fixed', top: '16px', left: '16px', right: '16px',
      zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(toast => {
        const c = config[toast.type] || config.info;
        return (
          <div key={toast.id} style={{ background: c.bg, backdropFilter: 'blur(20px)',
            border: `1px solid ${c.border}`, borderRadius: '14px',
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <span style={{ fontSize: '18px' }}>{c.icon}</span>
            <p style={{ color: 'white', fontSize: '13px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>
              {toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}