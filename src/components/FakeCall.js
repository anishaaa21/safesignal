// src/components/FakeCall.js

import { useState, useEffect, useRef } from 'react';

// Props explanation:
// isVisible   = true shows the screen, false hides it
// callerName  = name shown on the call screen (e.g. "Mom")
// onEnd       = function called when user hangs up
export default function FakeCall({
  isVisible,
  callerName = 'Mom',
  onEnd
}) {

  // Is the call ringing or has it been answered
  const [callAnswered, setCallAnswered] = useState(false);

  // How many seconds the call has been going
  const [callDuration, setCallDuration] = useState(0);

  // Store timer references so we can clear them
  const durationTimerRef = useRef(null);
  const ringTimerRef     = useRef(null);

  // Reset everything when screen becomes visible or hidden
  useEffect(() => {
    if (!isVisible) {
      // Hidden — reset all state
      setCallAnswered(false);
      setCallDuration(0);
      clearInterval(durationTimerRef.current);
      clearInterval(ringTimerRef.current);
      return;
    }

    // Visible — start ringing vibration
    if (navigator.vibrate) {
      // Vibrate pattern: 1 second on, 1 second off, repeat
      ringTimerRef.current = setInterval(() => {
        navigator.vibrate(1000);
      }, 2000);
    }

    // Cleanup when component unmounts
    return () => {
      clearInterval(durationTimerRef.current);
      clearInterval(ringTimerRef.current);
      if (navigator.vibrate) navigator.vibrate(0); // stop vibration
    };
  }, [isVisible]);

  // Start duration counter when call is answered
  useEffect(() => {
    if (callAnswered) {
      // Stop ringing vibration
      clearInterval(ringTimerRef.current);
      if (navigator.vibrate) navigator.vibrate(0);

      // Start counting seconds
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(durationTimerRef.current);
  }, [callAnswered]);

  // Format seconds to MM:SS
  // Example: 75 seconds → "1:15"
  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    setCallAnswered(true);
  };

  const handleEnd = () => {
    clearInterval(durationTimerRef.current);
    clearInterval(ringTimerRef.current);
    if (navigator.vibrate) navigator.vibrate(0);
    setCallAnswered(false);
    setCallDuration(0);
    onEnd(); // tell parent component to hide this screen
  };

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200]
                    bg-gray-900
                    flex flex-col items-center
                    justify-between py-20 px-8">

      {/* TOP SECTION — caller info */}
      <div className="text-center">

        {/* Caller photo placeholder */}
        <div className="w-32 h-32 bg-gray-700 rounded-full
                        flex items-center justify-center
                        mx-auto mb-6 text-7xl
                        border-4 border-gray-600">
          👤
        </div>

        {/* Status text */}
        <p className="text-gray-400 text-lg mb-2">
          {callAnswered ? 'Connected' : 'Incoming Call...'}
        </p>

        {/* Caller name */}
        <p className="text-white text-4xl font-bold mb-4">
          {callerName}
        </p>

        {/* Show duration when answered */}
        {callAnswered && (
          <p className="text-green-400 text-2xl font-mono">
            {formatDuration(callDuration)}
          </p>
        )}

        {/* Show ringing animation when not answered */}
        {!callAnswered && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full
                            animate-bounce"
                 style={{ animationDelay: '0ms' }}>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full
                            animate-bounce"
                 style={{ animationDelay: '150ms' }}>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full
                            animate-bounce"
                 style={{ animationDelay: '300ms' }}>
            </div>
          </div>
        )}
      </div>

      {/* MIDDLE SECTION — extra info when answered */}
      {callAnswered && (
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            SafeSignal Fake Call
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Use this time to safely leave the situation
          </p>
        </div>
      )}

      {/* BOTTOM SECTION — call buttons */}
      <div className="w-full space-y-4">

        {/* Accept button — only show when ringing */}
        {!callAnswered && (
          <button
            onClick={handleAnswer}
            className="w-full bg-green-600 hover:bg-green-700
                       text-white font-bold py-5
                       rounded-2xl text-xl
                       flex items-center justify-center gap-3
                       shadow-xl"
          >
            <span className="text-2xl">📞</span>
            Accept
          </button>
        )}

        {/* End / Decline button — always shown */}
        <button
          onClick={handleEnd}
          className="w-full bg-red-600 hover:bg-red-700
                     text-white font-bold py-5
                     rounded-2xl text-xl
                     flex items-center justify-center gap-3
                     shadow-xl"
        >
          <span className="text-2xl">📵</span>
          {callAnswered ? 'End Call' : 'Decline'}
        </button>

      </div>
    </div>
  );
}