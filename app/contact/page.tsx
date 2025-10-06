export const dynamic = "force-static";
export const revalidate = false;

export default function ContactPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="text-center space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white">Get in Touch</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          I'm always interested in new opportunities and exciting projects. Whether you need a
          backend system, AI solution, or technical consultation, let's discuss how I can help.
        </p>
      </header>

      {/* Contact Methods */}
      <section className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="glass-effect rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold mb-8 text-white">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-accent-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-accent-700 transition-all duration-300 hover-lift"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="glass-effect rounded-3xl p-8">
            <h2 className="font-display text-3xl font-bold mb-8 text-white">Contact Information</h2>
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
                  <p className="text-slate-300 font-medium">Email</p>
                  <a
                    href="mailto:dangnguyen28.work@gmail.com"
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
                  <p className="text-slate-300 font-medium">GitHub</p>
                  <a
                    href="https://github.com/yourname"
                    className="text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    github.com/yourname
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
                  <p className="text-slate-300 font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/yourname"
                    className="text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    linkedin.com/in/yourname
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-effect rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">Quick Actions</h3>
            <div className="space-y-4">
              <a
                href="mailto:dangnguyen28.work@gmail.com?subject=Project Inquiry"
                className="block w-full bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-all duration-300 text-center"
              >
                Start a Project
              </a>
              <a
                href="https://cal.com/yourname/30min"
                className="block w-full glass-effect border border-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:border-accent-400 transition-all duration-300 text-center"
              >
                Schedule a Call
              </a>
              <a
                href="/cv.pdf"
                className="block w-full glass-effect border border-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:border-accent-400 transition-all duration-300 text-center"
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
