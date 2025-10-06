"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ChatPopup from "./ChatPopup";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Auto open chat when on contact page
  // useEffect(() => {
  //   if (pathname === "/contact") {
  //     setIsOpen(true);
  //   }
  // }, [pathname]);

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent-600 rounded-full shadow-lg hover:bg-accent-700 transition-all duration-300 hover-lift group"
        aria-label="Open chat"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Chat Icon */}
          <svg
            className="w-8 h-8 text-white transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </div>
      </button>

      {/* Chat Popup */}
      <ChatPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
