import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <div className="space-y-20 md:space-y-28 mt-10">
      {/* HERO SECTION - Sean Halpin Style */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-tight font-bold text-white">
                I'm <span className="text-gradient">Dang Nguyen</span>.
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-slate-300 leading-relaxed">
                I'm a Software Engineer from Ho Chi Minh City, Vietnam.
              </p>
            </div>

            <div className="space-y-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              <p>
                Over the past 5 years, I've worked in various areas of software development,
                including backend systems, AI-powered solutions, and business applications. I'm
                proud to have built scalable systems that serve thousands of users.
              </p>
              <p>
                These days, I focus on building efficient backend systems and AI-powered chatbots
                that help businesses automate their processes and improve user experience.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <a
                href="mailto:dangnguyen28.work@gmail.com"
                className="text-slate-400 hover:text-accent-400 transition-colors font-medium"
              >
                dangnguyen28.work@gmail.com
              </a>
              <a
                href="https://github.com/yourname"
                className="text-slate-400 hover:text-accent-400 transition-colors font-medium"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yourname"
                className="text-slate-400 hover:text-accent-400 transition-colors font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full blur-2xl opacity-50"></div>
              <div className="relative glass-effect rounded-full p-2 hover-lift">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/avatar.png"
                    alt="Dang Nguyen"
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 384px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4 text-white">Featured Projects</h2>
            <p className="text-slate-400 text-lg">Some of my recent work and case studies</p>
          </div>
          <Link
            href="/projects"
            className="text-accent-400 hover:text-accent-300 transition-colors font-medium flex items-center gap-2"
          >
            View all projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.slice(0, 2).map((project, index) => (
            <div
              key={project.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ProjectCard p={project} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="contact"
        className="relative overflow-hidden rounded-3xl glass-effect p-8 md:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
              Let's work together
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm always interested in new opportunities and exciting projects. Whether you need a
              backend system, AI solution, or technical consultation, let's discuss how I can help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="bg-accent-600 text-white px-8 py-4 rounded-full font-medium hover:bg-accent-700 transition-all duration-300 hover-lift text-center"
            >
              Get in Touch
            </Link>
            <a
              href="https://cal.com/yourname/30min"
              className="glass-effect border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:border-accent-400 transition-all duration-300 text-center"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
