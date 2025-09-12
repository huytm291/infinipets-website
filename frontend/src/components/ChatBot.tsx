import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { callOpenAIFunction } from '../lib/supabaseClient'; 

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your INFINIPETS assistant. How can I help you find the perfect outfit for your furry friend? 🐾",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll xuống cuối khi có tin nhắn mới hoặc mở chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Ref để kiểm soát throttle (giới hạn tần suất gọi API)
  const throttleRef = useRef(false);
  // Ref để lưu timeout debounce
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hàm thực sự gửi tin nhắn và gọi API Edge Function OpenAI
  const sendMessage = async (userMessageText: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: userMessageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Gọi Edge Function OpenAI qua supabaseClient.ts
      const data = await callOpenAIFunction(userMessageText);

      // Giả sử Edge Function trả về { result: string }
      const botText = data.result || "Sorry, I couldn't process your request.";

      const botMessage: Message = {
        id: userMessage.id + 1,
        text: botText,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error(error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: error.message || "Oops! Something went wrong. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xử lý gửi tin nhắn với debounce + throttle
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    // Nếu đang throttle (đang chờ), không gửi nữa
    if (throttleRef.current) {
      console.log('Bạn đang gửi quá nhanh, vui lòng đợi.');
      return;
    }

    // Clear debounce timeout nếu có
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Đặt debounce timeout 500ms
    debounceTimeoutRef.current = setTimeout(() => {
      // Bật throttle: không cho gọi API trong 2 giây tới
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 2000);

      // Gửi tin nhắn
      sendMessage(trimmedMessage);
      setInputMessage('');
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group bg-gradient-to-r from-teal-500 to-green-400 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 hover:scale-110 animate-bounce"
        style={{ animationDuration: '2s' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-green-300 rounded-full opacity-30 group-hover:opacity-50 animate-ping"></div>
        <div className="relative z-10">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-green-400 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/images/customer-support-avatar.jpg"
                alt="Customer Support"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">INFINIPETS Support</h3>
                <p className="text-xs opacity-90">Always here to help! 🐾</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200 dark:scrollbar-thumb-green-400 dark:scrollbar-track-gray-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot ? (
                  <img
                    src="/images/customer-support-avatar.jpg"
                    alt="Support"
                    className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={12} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-gradient-to-r from-teal-500 to-green-400 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isLoading}
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-teal-500 to-green-400 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}