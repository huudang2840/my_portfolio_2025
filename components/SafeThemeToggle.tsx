"use client";

import { useEffect, useState } from "react";

export default function SafeThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);

    // Load theme from localStorage
    try {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        // Check system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        setTheme(systemTheme);
      }
    } catch {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Apply to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    // Save to localStorage
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // localStorage not available
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative p-2 rounded-full glass-effect">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass-effect hover:bg-slate-700/50 transition-all duration-300 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-300 ${
            theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-slate-300 transition-all duration-300 ${
            theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === "dark" ? "shadow-glow opacity-0 group-hover:opacity-50" : "shadow-none"
        }`}
      />
    </button>
  );
}
