import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import { Mail, Linkedin, FileDown } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <div className="mt-8 flex flex-col gap-12">
      {/* HERO SECTION - Sean Halpin Style */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 md:gap-16 lg:gap-20 items-center lg:items-start">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold text-primary">
                I&apos;m <span className="text-gradient">Dang Nguyen</span>.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-secondary leading-relaxed">
                Software Developer in Ho Chi Minh City, Viet Nam.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-tertiary leading-relaxed">
              <p>
                I build <strong>POS (Magento&nbsp;2)</strong>, <strong>AI RAG chatbots</strong>, and{" "}
                <strong>Power Platform</strong> automations. 1.5+ years shipping production systems
                across PHP, React/Next, Python, Azure OpenAI, Supabase.
              </p>

              {/* quick highlights as badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  Saved ~$20k/yr licenses
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  Bank QR Pay integration
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  OCR → RAG pipeline
                </span>
              </div>
            </div>

            <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-6 pb-8">
              {/* Email */}
              <a
                href="mailto:dangnguyen28.work@gmail.com"
                aria-label="Email"
                title="dangnguyen28.work@gmail.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="sr-only">Email</span>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/%C4%91%C4%83ng-nguy%E1%BB%85n-7a4b04240/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all hover:-translate-y-0.5"
              >
                <Linkedin className="w-5 h-5 text-primary" />
                <span className="sr-only">LinkedIn</span>
              </a>

              {/* Download CV */}
              <a
                href="/cv/NguyenHuuDang_SoftwareDeveloper.pdf"
                download
                aria-label="Download CV"
                title="Download CV"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all hover:-translate-y-0.5"
              >
                <FileDown className="w-5 h-5 text-primary" />
                <span className="sr-only">Download CV</span>
              </a>
            </div>
          </div>

          <div className="relative order-2 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-64  sm:w-72  md:w-80  lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full blur-2xl opacity-50"></div>
              <div className="relative cta-card rounded-full p-2 hover-lift">
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
      <section id="projects" className="space-y-8 md:space-y-12 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-primary">
              Featured Projects
            </h2>
            <p className="text-tertiary text-base md:text-lg">
              POS, RAG chatbot, and workflow automation case studies
            </p>
          </div>
          <Link
            href="/projects"
            className="text-accent-300 hover:text-accent-200 transition-colors font-medium flex items-center gap-2 text-sm md:text-base"
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
        className="relative overflow-hidden rounded-3xl hero-cta-card p-6 md:p-8 lg:p-12"
      >
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              Let&apos;s work together
            </h3>
            <p className="text-secondary text-base md:text-lg leading-relaxed">
              Need a reliable developer for <strong>POS (Magento&nbsp;2)</strong>,{" "}
              <strong>AI RAG chatbots</strong>, or <strong>Power Platform automations</strong>? I
              can help ship production-ready systems with clear business impact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="bg-accent-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-accent-700 transition-all duration-300 hover-lift text-center text-sm md:text-base"
            >
              Get in Touch
            </Link>
            {/* <a
              href="https://cal.com/yourname/30min"
              className="bg-primary/10 border-2 border-primary/30 text-primary px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 text-center text-sm md:text-base hover-lift"
            >
              Schedule Call
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}
