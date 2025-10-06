import type { Metadata } from "next";
import "./globals.css";
import { Inter, Unbounded } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dang Nguyen — Software Engineer",
  description: "Portfolio của Dang Nguyen: dự án, case study và ghi chú kỹ thuật.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${unbounded.variable}`}>
      <body className="body-surface min-h-dvh text-slate-100 antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-16">{children}</main>
        <Footer />
        <ChatBubble />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-slate-700 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Dang Nguyen. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-1">Built with Next.js & Tailwind CSS</p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:dangnguyen28.work@gmail.com"
              className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
            >
              Email
            </a>
            <a
              href="https://github.com/yourname"
              className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yourname"
              className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
