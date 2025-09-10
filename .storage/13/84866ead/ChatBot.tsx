import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Heart, ShoppingBag, Info } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'product' | 'suggestion';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 🐾 Welcome to INFINIPETS! I\'m Luna, your personal pet fashion assistant. How can I help you find the perfect style for your furry friend today?',
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    { text: '🦴 Size Guide', icon: '📏' },
    { text: '🎨 Color Options', icon: '🌈' },
    { text: '🚚 Shipping Info', icon: '📦' },
    { text: '⭐ Best Sellers', icon: '🏆' }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('size') || lowerText.includes('fit')) {
      return {
        id: Date.now().toString(),
        text: 'Great question! 📏 Our sizing guide is designed to ensure the perfect fit:\n\n• XS: Chest 25-30cm (Chihuahua, Yorkshire Terrier)\n• S: Chest 30-35cm (Pomeranian, Maltese)\n• M: Chest 35-45cm (Beagle, Cocker Spaniel)\n• L: Chest 45-55cm (Golden Retriever, Labrador)\n• XL: Chest 55-65cm (German Shepherd, Rottweiler)\n\nWould you like me to help you measure your pet? 🐕',
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
      return {
        id: Date.now().toString(),
        text: '🚚 Shipping Information:\n\n• Free shipping across EU for orders over €50\n• Standard delivery: 3-5 business days\n• Express delivery: 1-2 business days (+€9.99)\n• Eco-friendly packaging included! 🌱\n\nWhere would you like your order delivered?',
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    if (lowerText.includes('recommend') || lowerText.includes('suggest') || lowerText.includes('best')) {
      return {
        id: Date.now().toString(),
        text: '⭐ Based on our customers\' favorites, I recommend:\n\n🧶 Cozy Knit Sweater (€34.99) - Perfect for winter walks\n🦸 Superhero Cape Set (€49.99) - Great for playful pups\n🎩 Elegant Tuxedo (€67.99) - Ideal for special occasions\n\nWhat type of occasion are you shopping for? Everyday wear or something special? ✨',
        isBot: true,
        timestamp: new Date(),
        type: 'suggestion'
      };
    }
    
    if (lowerText.includes('color') || lowerText.includes('colours')) {
      return {
        id: Date.now().toString(),
        text: '🌈 Our color palette is carefully curated:\n\n• Classic colors: Navy Blue, Forest Green, Burgundy\n• Bright options: Bright Yellow, Ocean Blue, Electric Blue\n• Elegant tones: Rose Pink, Lavender, Champagne Gold\n• Natural shades: Classic Brown, Black, Tan\n\nWhich color family matches your pet\'s personality best?',
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Default responses
    const responses = [
      'That\'s interesting! 🤔 Let me help you find exactly what you\'re looking for. Could you tell me more about your pet\'s size and style preferences?',
      'I\'d love to help! 🐾 Are you looking for everyday wear, special occasion outfits, or perhaps something from our limited edition collections?',
      'Perfect! ✨ What type of pet do you have, and what\'s their personality like? This helps me recommend the best styles!',
      'Great choice shopping with INFINIPETS! 🎉 Would you like to see our featured products or do you have something specific in mind?'
    ];
    
    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button - Updated with consistent gradient */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-gradient-to-r from-yellow-400 to-pink-500 text-black p-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-200" />
          ) : (
            <MessageCircle size={24} className="transition-transform duration-200 group-hover:rotate-12" />
          )}
          
          {/* Notification dot */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-4 text-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Luna - Pet Fashion AI</h3>
                  <p className="text-xs opacity-90">Online • Ready to help! 🐾</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-yellow-50/30 to-pink-50/30 dark:from-gray-800 dark:to-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    {message.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.isBot
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isBot ? 'text-gray-500' : 'text-white/70'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion.text)}
                    className="text-xs p-2 bg-white dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors text-left"
                  >
                    <span className="mr-1">{suggestion.icon}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask Luna about pet fashion... 🐾"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black rounded-xl hover:from-yellow-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Powered by AI • Made with <Heart size={12} className="inline text-red-500" /> for pets
            </p>
          </div>
        </div>
      )}
    </>
  );
}