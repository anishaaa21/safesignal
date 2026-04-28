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
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
  }, []);

  const colors = {
    danger:  'bg-red-800 border-red-600',
    success: 'bg-green-800 border-green-600',
    warning: 'bg-yellow-800 border-yellow-600',
    info:    'bg-blue-900 border-blue-600',
  };

  const icons = {
    danger: '🚨', success: '✅', warning: '⚠️', info: 'ℹ️'
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${colors[toast.type]} border rounded-xl px-4 py-3 
                     flex items-center gap-3 shadow-xl`}
        >
          <span>{icons[toast.type]}</span>
          <p className="text-white text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}