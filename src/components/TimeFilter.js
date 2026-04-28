const timeOptions = [
  { label: 'All',      value: 'all',     },
  { label: '🌅 Day',   value: 'morning', },
  { label: '🌆 Eve',   value: 'evening', },
  { label: '🌙 Night', value: 'night',   },
];

export default function TimeFilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 bg-gray-900 bg-opacity-90 
                    backdrop-blur px-3 py-2 rounded-full shadow-lg">
      {timeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                     ${activeFilter === option.value
                       ? 'bg-red-600 text-white scale-105'
                       : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                     }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}