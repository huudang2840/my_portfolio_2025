export const dynamic = "force-static";
export const revalidate = false;

export default function AboutPage() {
  const skills = [
    {
      category: "Backend",
      items: ["PHP (Magento 2)", "Python", "Node.js", "AL (Dynamics 365 BC)", "API Design"],
    },
    {
      category: "Frontend",
      items: ["Vue/Nuxt", "React/Next.js", "TypeScript", "UI/UX & Responsive"],
    },
    {
      category: "Data & Infra",
      items: ["MySQL", "SQL Server", "Postgres", "MongoDB", "Docker", "Linux"],
    },
    {
      category: "AI & Automation",
      items: ["Azure OpenAI", "Supabase (pgvector)", "RAG Systems", "Tesseract OCR", "n8n"],
    },
    {
      category: "Power Platform",
      items: ["Power Apps", "Power Automate", "Microsoft Teams/Outlook"],
    },
    {
      category: "Collab & Delivery",
      items: ["Git/Sourcetree", "Release Planning", "System Deployment", "Problem Solving"],
    },
  ];

  const timeline = [
    {
      year: "2023 — 2025",
      title: "Software Developer - LIEN A",
      desc: "Full-stack development across retail systems and internal tools. Key areas: POS (Magento 2), integrations, automation, and reliability.",
      icon: "💼",
    },
    {
      year: "2023",
      title: "Frontend Intern - Keppel Land Vietnam",
      desc: "Implemented UI, responsive layouts, and basic data visualization. Collaborated with senior engineers on code quality and delivery.",
      icon: "🌱",
    },
    {
      year: "2019–2023",
      title: "Ton Duc Thang University",
      desc: "BSc in Information Technology (2023). Scholarships: 2020–2021, 2021–2022. GPA: 8.16/10. Award: Second Prize — E-card Design.",
      icon: "🎓",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="text-center space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary">About Me</h1>
        <p className="text-xl text-tertiary max-w-4xl mx-auto leading-relaxed">
          Full-stack developer with 2 years of hands-on experience in retail and enterprise apps. I
          focus on <strong>POS with Magento&nbsp;2</strong>, <strong>AI-powered RAG</strong>, and
          <strong> workflow automation</strong>. My approach: clean architecture, measurable impact,
          and maintainable code.
        </p>
      </header>

      {/* Skills Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary">
            Skills & Technologies
          </h2>
          <p className="text-tertiary text-lg">What I use to ship reliable systems</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="cta-card rounded-3xl p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-bold text-lg mb-4 text-accent-300">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-secondary text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary">
            My Journey
          </h2>
          <p className="text-tertiary text-lg">Milestones that shaped my work</p>
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
                  <div className="flex-shrink-0 w-16 h-16 cta-card rounded-full flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1 cta-card rounded-3xl p-6 hover-lift">
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-accent-300 font-bold text-lg">{item.year}</span>
                      <h3 className="font-bold text-xl text-primary">{item.title}</h3>
                    </div>
                    <p className="text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="text-center">
        <div className="cta-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary">
            My Philosophy
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="font-bold text-lg text-primary">Simple</h3>
              <p className="text-tertiary text-sm">Readable, straightforward code</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="font-bold text-lg text-primary">Maintainable</h3>
              <p className="text-tertiary text-sm">Easy to extend, test, and debug</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="font-bold text-lg text-primary">Measurable</h3>
              <p className="text-tertiary text-sm">Clear KPIs and performance metrics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
