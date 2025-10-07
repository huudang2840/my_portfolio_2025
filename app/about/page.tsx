export const dynamic = "force-static";
export const revalidate = false;

export default function AboutPage() {
  const skills = [
    {
      category: "Backend",
      items: ["Python (Flask/FastAPI)", "Odoo 17", "PostgreSQL", "Redis", "Docker"],
    },
    {
      category: "AI & ML",
      items: ["Azure OpenAI", "Supabase", "FAISS/BM25", "RAG Systems", "OCR Processing"],
    },
    {
      category: "Frontend",
      items: ["React/Next.js", "Tailwind CSS", "TypeScript", "Responsive Design"],
    },
    {
      category: "Tools",
      items: ["Git", "Linux", "API Design", "Performance Optimization", "System Architecture"],
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: "Promotions Engine v2",
      desc: "Refactored rule engine for better performance and flexibility. Implemented advanced caching strategies and optimized database queries.",
      icon: "🚀",
    },
    {
      year: "2024",
      title: "RAG Chatbot System",
      desc: "Built intelligent chatbot using Azure OpenAI, Supabase, and Vietnamese OCR. Achieved 82% top-1 answer accuracy.",
      icon: "🤖",
    },
    {
      year: "2023",
      title: "Factory In/Out Portal",
      desc: "Developed QR-based check-in/out system with photo verification and multi-step approval workflow. Reduced check-in time by 60%.",
      icon: "📱",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="text-center space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white  ">About Me</h1>
        <p className="text-xl text-slate-400   max-w-4xl mx-auto leading-relaxed">
          I'm a passionate software engineer focused on building scalable backend systems and
          AI-powered solutions. My approach is simple: clean architecture, measurable results, and
          maintainable code.
        </p>
      </header>

      {/* Skills Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
            Skills & Technologies
          </h2>
          <p className="text-slate-400   text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="glass-effect rounded-3xl p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-bold text-lg mb-4 text-accent-300  ">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-slate-300   text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-400   rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
            My Journey
          </h2>
          <p className="text-slate-400   text-lg">
            Key milestones and projects that shaped my career
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-ocean-500"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className="relative flex items-start gap-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 glass-effect rounded-full flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1 glass-effect rounded-3xl p-6 hover-lift">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-accent-300   font-bold text-lg">{item.year}</span>
                      <h3 className="font-bold text-xl text-white  ">{item.title}</h3>
                    </div>
                    <p className="text-slate-300   leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="text-center">
        <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white  ">
            My Philosophy
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white  ">Simple</h3>
              <p className="text-slate-400   text-sm">
                Clean, readable code that anyone can understand and maintain
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white  ">Maintainable</h3>
              <p className="text-slate-400   text-sm">
                Code that's easy to extend, debug, and improve over time
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white  ">Measurable</h3>
              <p className="text-slate-400   text-sm">
                Results-driven development with clear metrics and performance indicators
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
