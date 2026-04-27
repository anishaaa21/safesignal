import { useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setLoginError('');
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setLoginError('Login failed. Please try again.');
      console.error(err);
    }
    setSigningIn(false);
  };

  const featureList = [
    { icon: '🗺️', text: 'Live risk zone heatmap' },
    { icon: '🆘', text: 'One-tap SOS alerts' },
    { icon: '🛡️', text: 'Journey safety guard' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-6">

      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-3xl">🛡️</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-2">SafeSignal</h1>
        <p className="text-gray-400 text-lg">Safety that works before you ask</p>
      </div>

      <div className="w-full max-w-sm mb-8 space-y-3">
        {featureList.map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-gray-300">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={signingIn}
        className="w-full max-w-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-600 
                   text-white font-bold py-4 px-8 rounded-2xl text-lg 
                   transition-all duration-200 shadow-lg"
      >
        {signingIn ? '⏳ Signing in...' : '🔐 Sign in with Google'}
      </button>

      {loginError && (
        <p className="text-red-400 mt-4 text-center">{loginError}</p>
      )}

      <p className="text-gray-600 text-xs mt-8 text-center">
        Your location and data are kept private and secure
      </p>
    </div>
  );
}