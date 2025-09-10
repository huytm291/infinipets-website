import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Much faster loading - complete in ~1 second
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadComplete();
          }, 100);
          return 100;
        }
        return prev + 50; // Very fast progress
      });
    }, 50); // Very fast interval

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="text-center">
        {/* Paw Prints Animation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="text-6xl paw-bounce">🐾</div>
          <div className="text-6xl paw-bounce-delayed">🐾</div>
        </div>
        
        {/* INFINIPETS Logo */}
        <h1 className="font-coiny text-4xl md:text-6xl text-white mb-8 tracking-wide">
          INFINIPETS
        </h1>
        
        {/* Tagline */}
        <p className="text-white/80 text-lg md:text-xl mb-12 font-light">
          Infinite Styles for Infinite Personalities
        </p>
        
        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-white/60 text-sm mt-4">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 text-2xl opacity-30 float" style={{ animationDelay: '0s' }}>✨</div>
      <div className="absolute top-40 right-32 text-xl opacity-30 float" style={{ animationDelay: '1s' }}>🎾</div>
      <div className="absolute bottom-32 left-32 text-2xl opacity-30 float" style={{ animationDelay: '2s' }}>🦴</div>
      <div className="absolute bottom-20 right-20 text-xl opacity-30 float" style={{ animationDelay: '0.5s' }}>🐕</div>
    </div>
  );
};

export default LoadingScreen;