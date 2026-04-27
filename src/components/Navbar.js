import { useNavigate, useLocation } from 'react-router-dom';

const navTabs = [
  { label: 'Map',      path: '/',         icon: '🗺️' },
  { label: 'Report',   path: '/report',   icon: '📍' },
  { label: 'Journey',  path: '/journey',  icon: '🛡️' },
  { label: 'Contacts', path: '/contacts', icon: '👥' },
];

export default function BottomNavbar() {
  const navigate = useNavigate();
  const currentPath = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 
                    flex justify-around items-center py-2 z-50">
      {navTabs.map((tab) => {
        const isActiveTab = currentPath.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center 
                       min-w-[60px] py-2 px-3 rounded-xl transition-all
                       ${isActiveTab
                         ? 'text-red-500 bg-red-950'
                         : 'text-gray-500 hover:text-gray-300'
                       }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}