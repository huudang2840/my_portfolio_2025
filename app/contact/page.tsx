"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Message sent successfully! I'll get back to you soon.");
        setRemaining(data.remaining);
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send message. Please try again.");
        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-20 mt-8">
      {/* Hero Section */}
      <header className="text-center space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary">Get in Touch</h1>
        <p className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed">
          I'm always interested in new opportunities and exciting projects. Whether you need a
          frontend, backend system, AI solution, or technical consultation, let's discuss how I can
          help.
        </p>
      </header>

      {/* Contact Methods */}
      <section className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="cta-card rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold mb-8 text-primary">Send a Message</h2>

          {/* Status Messages */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              <p className="font-medium">{message}</p>
              {status === "success" && remaining !== null && (
                <p className="text-sm mt-2">
                  You can send {remaining} more message{remaining !== 1 ? "s" : ""} this hour.
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-secondary/50 border border-primary/20 rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-secondary/50 border border-primary/20 rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                maxLength={200}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-secondary/50 border border-tertiary rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-black disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={2000}
                rows={6}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-secondary/50 border border-tertiary rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none text-black disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell me about your project..."
              ></textarea>
              <p className="text-xs text-tertiary mt-1">
                {formData.message.length}/2000 characters
              </p>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-accent-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-accent-700 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-600 disabled:transform-none"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
            <p className="text-xs text-center text-tertiary">
              📧 Limited to 3 messages per hour to prevent spam
            </p>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="cta-card rounded-3xl p-8">
            <h2 className="font-display text-3xl font-bold mb-8 text-primary">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-600/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-secondary font-medium">Email</p>
                  <a
                    href="mailto:dangnguyen28.work@gmail.com"
                    target="_blank"
                    className="text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    dangnguyen28.work@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-secondary font-medium">GitHub</p>
                  <a
                    href="https://github.com/huudang2840"
                    target="_blank"
                    className="text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    https://github.com/huudang2840
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-secondary font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/%C4%91%C4%83ng-nguy%E1%BB%85n-7a4b04240/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    linkedin.com/in/đăng-nguyễn-7a4b04240
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="cta-card rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-primary">Quick Actions</h3>
            <div className="space-y-4">
              <a
                href="mailto:dangnguyen28.work@gmail.com?subject=Project Inquiry"
                className="block w-full bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-all duration-300 text-center"
              >
                Start a Project
              </a>
              {/* <a
                href="https://cal.com/yourname/30min"
                className="block w-full cta-card border border-primary/20 text-primary px-6 py-3 rounded-lg font-medium hover:border-accent-400 transition-all duration-300 text-center"
              >
                Schedule a Call
              </a> */}
              <a
                href="/cv/NguyenHuuDang_SoftwareDeveloper.pdf"
                className="block w-full cta-card border border-primary/20 text-primary px-6 py-3 rounded-lg font-medium hover:border-accent-400 transition-all duration-300 text-center"
                download
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
