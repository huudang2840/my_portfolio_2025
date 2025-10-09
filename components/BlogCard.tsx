import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      className={`group cta-card rounded-3xl overflow-hidden hover-lift ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {post.image && (
        <div className={`relative overflow-hidden ${featured ? "h-64" : "h-48"}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-4 text-sm text-tertiary">
          <span className="bg-tertiary px-2 py-1 rounded text-xs text-secondary">
            {post.category}
          </span>
          <span>{formatDate(post.published_at)}</span>
          <span>{post.read_time} min read</span>
        </div>

        <div className="space-y-3">
          <h3
            className={`font-display font-bold text-primary group-hover:text-accent-400 transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className={`text-secondary leading-relaxed ${featured ? "text-lg" : "text-sm"}`}>
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-tertiary/50 text-secondary px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-tertiary text-xs">+{post.tags.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-600/20 rounded-full flex items-center justify-center">
              <span className="text-accent-400 text-xs font-bold">{post.author.charAt(0)}</span>
            </div>
            <span className="text-tertiary text-sm">{post.author}</span>
          </div>

          <Link
            href={`/blogs/${post.slug}`}
            className="text-accent-400 hover:text-accent-300 transition-colors font-medium text-sm flex items-center gap-1"
          >
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
