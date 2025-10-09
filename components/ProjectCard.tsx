import Image from "next/image";
import Badge from "./Badge";
import type { Project } from "@/lib/data";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group cta-card rounded-3xl overflow-hidden hover-lift">
      {p.image && (
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-accent-300 transition-colors">
            {p.title}
          </h3>
          <p className="text-secondary leading-relaxed text-sm md:text-base">{p.summary}</p>
          {p.result && (
            <div className="flex items-center gap-2 text-accent-300 font-medium text-sm md:text-base">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {p.result}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {p.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-4">
          {p.href && (
            <a
              href={p.href}
              className="flex items-center gap-2 text-tertiary hover:text-accent-300 transition-colors font-medium text-sm md:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              className="flex items-center gap-2 text-tertiary hover:text-accent-300 transition-colors font-medium text-sm md:text-base"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
