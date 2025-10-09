import type { Metadata } from "next";
import "./globals.css";
import { Inter, Unbounded } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import { ThemeProvider } from "@/lib/theme-context";
import ThemeScript from "@/components/ThemeScript";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import SmoothFollower from "@/components/SmoothFollower";

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
    <html lang="vi" className={`${inter.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="body-surface min-h-dvh text-primary antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothFollower />
          <Header />
          <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-16 mt-8 md:mt-10">
            {children}
          </main>
          <Footer />
          <ChatBubble />
          <FloatingThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-primary/10 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-tertiary text-sm">© 2025 Dang Nguyen. All rights reserved.</p>
            <p className="text-muted text-xs mt-1">Built with Next.js & Tailwind CSS</p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:dangnguyen28.work@gmail.com"
              className="text-tertiary hover:text-accent-300 transition-colors text-sm"
            >
              Email
            </a>
            <a
              href="https://github.com/yourname"
              className="text-tertiary hover:text-accent-300 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yourname"
              className="text-tertiary hover:text-accent-300 transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
