export default function LoadingScreen({ message = 'Loading SafeSignal...' }) {
  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col 
                    items-center justify-center z-50">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-red-600 
                        opacity-20 animate-ping scale-150"></div>
        <div className="relative w-20 h-20 bg-red-600 rounded-full 
                        flex items-center justify-center">
          <span className="text-3xl">🛡️</span>
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">SafeSignal</h2>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}