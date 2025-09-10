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
      {/* Chat Button - Updated with new gradient and enhanced animations */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
        >
          {/* Animated background pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full"></div>
          
          {/* Icon container */}
          <div className="relative z-10">
            {isOpen ? (
              <X size={24} className="transition-all duration-300 group-hover:rotate-90" />
            ) : (
              <MessageCircle size={24} className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            )}
          </div>
          
          {/* Notification dot with enhanced animation */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
            </div>
          )}
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
            <div className="absolute bottom-1 left-2 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header with enhanced gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold">Luna - Pet Fashion AI</h3>
                  <p className="text-xs opacity-90 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online • Ready to help! 🐾
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-indigo-50/30 to-purple-50/30 dark:from-gray-800 dark:to-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                  }`}>
                    {message.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`rounded-2xl p-3 relative ${
                    message.isBot
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md border border-indigo-100 dark:border-gray-700'
                      : 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
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
              <div className="flex justify-start animate-in slide-in-from-bottom-2 fade-in duration-300">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-md border border-indigo-100 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                    className="text-xs p-2 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 text-left hover:scale-105 hover:shadow-md"
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
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white text-sm transition-all duration-300"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="group p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
                <Send size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Powered by AI • Made with <Heart size={12} className="inline text-red-500 animate-pulse" /> for pets
            </p>
          </div>
        </div>
      )}
    </>
  );
}