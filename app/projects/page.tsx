import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = false;

export default function ProjectsPage() {
  return (
    <div className="space-y-16">
      <header className="text-center space-y-6 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold">All Projects</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          A collection of my recent work, each project includes a detailed case study and measurable
          results. From backend systems to AI solutions.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard p={project} />
          </div>
        ))}
      </div>

      <div className="text-center py-16">
        <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Have a project in mind?
          </h3>
          <p className="text-slate-400 mb-6">
            I'm always interested in new challenges and opportunities to create something amazing.
          </p>
          <a
            href="mailto:dangnguyen28.work@gmail.com"
            className="bg-gradient-to-r from-brand-500 to-accent-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-glow transition-all duration-300 hover-lift inline-block"
          >
            Let's discuss your project
          </a>
        </div>
      </div>
    </div>
  );
}
