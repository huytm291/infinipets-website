import { useState } from 'react';
import { Send } from 'lucide-react';

interface NewsletterSectionProps {
  isDarkMode: boolean;
  onSubscribe: (email: string) => Promise<void>;
}

export default function NewsletterSection({ isDarkMode, onSubscribe }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [envelopes, setEnvelopes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    
    // Hiệu ứng lá thư bay lên
    createEnvelopeAnimation(e.currentTarget as HTMLFormElement);
    
    try {
      await onSubscribe(email);
      setEmail('');
      setShowWelcomePopup(true); // Hiện popup chào mừng
    } catch (error) {
      console.error('Subscription error:', error);
      // Có thể thêm thông báo lỗi nếu muốn
    } finally {
      setIsSubscribing(false);
    }
  };

  const createEnvelopeAnimation = (form: HTMLFormElement) => {
    const rect = form.getBoundingClientRect();
    const newEnvelopes = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + Math.random() * rect.width,
      y: rect.top,
    }));
    
    setEnvelopes(newEnvelopes);
    setTimeout(() => setEnvelopes([]), 3500);
  };

  return (
    <>
      <style jsx>{`
        @keyframes flyUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-400px) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
        
        .envelope-animation {
          animation: flyUp 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      <section className={`py-20 px-4 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-teal-50 to-green-50'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/10 to-green-400/10 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Join Our Exclusive Community
            </h2>
            
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Be the first to discover new collections, exclusive offers, and premium pet care insights
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={`flex-1 px-6 py-4 rounded-full border-3 text-lg outline-none transition-all duration-400 focus:scale-102 ${
                  isDarkMode
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400'
                    : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                } focus:shadow-lg focus:shadow-teal-500/30`}
                disabled={isSubscribing}
              />
              
              <button
                type="submit"
                disabled={isSubscribing}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isSubscribing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-500 to-green-400 hover:from-teal-600 hover:to-green-500 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubscribing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Subscribe Now</span>
                    <Send size={20} />
                  </div>
                )}
              </button>
            </form>

            <p className={`text-sm mt-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Join 10,000+ pet lovers who trust INFINIPETS for premium fashion
            </p>
          </div>
        </div>

        {/* Flying Envelopes */}
        {envelopes.map((envelope) => (
          <div
            key={envelope.id}
            className="fixed envelope-animation text-4xl text-teal-500"
            style={{
              left: `${envelope.x}px`,
              top: `${envelope.y}px`,
            }}
          >
            ✉️
          </div>
        ))}

        {/* Popup Welcome */}
        {showWelcomePopup && (
          <div className="fixed inset-0 flex items-center justify-center z-[10000]">
            {/* Overlay mờ nền */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setShowWelcomePopup(false)}
            ></div>

            {/* Nội dung popup */}
            <div className={`relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center ${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <h3 className="text-2xl font-semibold mb-4">Welcome to INFINIPETS family!</h3>
              <p className="mb-6 text-lg">
                Thank you for subscribing. Stay tuned for exclusive offers and updates.
              </p>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-[#14b8a6] hover:bg-[#0f8f8a] text-white'
                    : 'bg-[#4ade80] hover:bg-[#3ac66a] text-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}