import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28 mt-8">
      {/* HERO SECTION - Sean Halpin Style */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 md:gap-16 lg:gap-20 items-center lg:items-start">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold text-white  ">
                I'm <span className="text-gradient">Dang Nguyen</span>.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-slate-300   leading-relaxed">
                I'm a Software Engineer from Ho Chi Minh City, Vietnam.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-400   leading-relaxed">
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 pt-4">
              <a
                href="mailto:dangnguyen28.work@gmail.com"
                className="text-slate-400   hover:text-accent-600   transition-colors font-medium text-sm sm:text-base break-all"
              >
                dangnguyen28.work@gmail.com
              </a>
              <a
                href="https://github.com/yourname"
                className="text-slate-400   hover:text-accent-600   transition-colors font-medium text-sm sm:text-base"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yourname"
                className="text-slate-400   hover:text-accent-600   transition-colors font-medium text-sm sm:text-base"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="relative order-2 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full blur-2xl opacity-50"></div>
              <div className="relative glass-effect rounded-full p-2 hover-lift">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/avatar_blue_2.png"
                    alt="Dang Nguyen"
                    className="object-cover w-full h-full"
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="space-y-8 md:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-white  ">
              Featured Projects
            </h2>
            <p className="text-slate-400   text-base md:text-lg">
              Some of my recent work and case studies
            </p>
          </div>
          <Link
            href="/projects"
            className="text-accent-300   hover:text-accent-200  transition-colors font-medium flex items-center gap-2 text-sm md:text-base"
          >
            View all projects
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        className="relative overflow-hidden rounded-3xl glass-effect p-6 md:p-8 lg:p-12"
      >
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white  ">
              Let's work together
            </h3>
            <p className="text-slate-300   text-base md:text-lg leading-relaxed">
              I'm always interested in new opportunities and exciting projects. Whether you need a
              backend system, AI solution, or technical consultation, let's discuss how I can help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="bg-accent-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-accent-700 transition-all duration-300 hover-lift text-center text-sm md:text-base"
            >
              Get in Touch
            </Link>
            <a
              href="https://cal.com/yourname/30min"
              className="glass-effect border border-white/20   text-white   px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:border-accent-300   transition-all duration-300 text-center text-sm md:text-base"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
