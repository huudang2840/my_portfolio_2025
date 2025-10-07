"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (!header) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.style.background = "rgba(15, 23, 42, 0.9)";
        header.style.backdropFilter = "blur(10px)";
        header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
      } else {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.borderBottom = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-4xl h-16 px-4 md:px-6 flex items-center justify-center">
        <nav
          className="flex items-center gap-10 text-sm font-large px-6 py-2 rounded-2xl"
          id="header"
        >
          <Link href="/projects" className="text-slate-300 hover:text-accent-400 transition-colors">
            Work
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-accent-400 transition-colors">
            About
          </Link>
          <Link href="/" className="font-display text-xl font-bold text-white">
            DN
          </Link>
          <Link href="/blogs" className="text-slate-300 hover:text-accent-400 transition-colors">
            Blogs
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-accent-400 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
