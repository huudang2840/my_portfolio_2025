"use client";

import { useState, useRef, useEffect } from "react";

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "I'm Dang Bot. I'm here to help you with any questions you might have about Dang's work.",
      isBot: true,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedActions = [
    "Looking for your old portfolio",
    "Just saying hello!",
    "Interested in mentorship",
    "We'd like to hire you",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll make sure Dang gets back to you soon. In the meantime, feel free to check out his work or send an email directly.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Chat Popup */}
      <div className="relative w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-accent-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white   font-bold text-lg">D</span>
            </div>
            <div>
              <h3 className="text-white   font-semibold">Dang Bot</h3>
              <p className="text-accent-100 text-sm">Ask me a question</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white   hover:text-accent-200  transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  message.isBot ? "bg-gray-200 text-gray-800" : "bg-accent-600 text-white  "
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Suggested Actions */}
          {messages.length === 2 && (
            <div className="space-y-2">
              {suggestedActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(action)}
                  className="block w-full text-left px-4 py-2 bg-white border border-accent-600 text-accent-600 rounded-full text-sm hover:bg-accent-50 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-accent-600 text-white   rounded-full hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
