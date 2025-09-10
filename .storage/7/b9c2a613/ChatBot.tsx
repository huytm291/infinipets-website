import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Pawl, your INFINIPETS style assistant! 🐾 How can I help you find the perfect outfit for your furry friend today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const botResponses = [
    "That sounds adorable! Let me help you find the perfect size. What type of pet do you have and what are their measurements? 📏",
    "Great choice! Our handmade collection is absolutely stunning. Each piece is crafted with love and attention to detail. Would you like to see our latest arrivals? ✨",
    "For special occasions, I'd recommend our Cosplay & Gala collection! We have elegant tuxedos, princess gowns, and superhero capes. What's the occasion? 🎭",
    "Our Limited Edition collections are perfect for fashion-forward pets! Right now we have the 'Forest Explorer' and 'Space Voyager' sets. Both are flying off the shelves! 🚀",
    "Absolutely! We ship throughout Europe with free shipping on orders over €50. Most orders arrive within 3-5 business days. Where are you located? 🌍",
    "Size guides are super important! Each product has detailed measurements. Pro tip: measure your pet's chest, neck, and back length for the best fit. Need help with measurements? 📐",
    "Our customers love sharing photos of their stylish pets! Check out our social media for daily dose of cuteness. Would you like tips on how to photograph your pet in their new outfit? 📸"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 breathe ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🐾
              </div>
              <div>
                <h3 className="font-semibold">Pawl</h3>
                <p className="text-xs opacity-90">INFINIPETS Style Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      : 'bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-br-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 opacity-70 ${
                    message.isBot ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about sizes, styles, shipping..."
                className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-green-600 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;