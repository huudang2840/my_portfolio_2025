import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(undefined, undefined, true); // Use static client
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-8">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <Link
            href="/blogs"
            className="hover:text-accent-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <span>•</span>
          <span className="bg-slate-700 px-2 py-1 rounded text-xs">{post.category}</span>
          <span>{formatDate(post.published_at)}</span>
          <span>{post.read_time} min read</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-600/20 rounded-full flex items-center justify-center">
              <span className="text-accent-400 text-lg font-bold">{post.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-slate-400 text-sm">Published on {formatDate(post.published_at)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none">
        <div
          className="text-slate-300 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/\n\n/g, "</p><p>")
              .replace(/^/, "<p>")
              .replace(/$/, "</p>")
              .replace(/#{1,6}\s+(.+)/g, (match, title) => {
                const level = match.match(/^#+/)?.[0]?.length ?? 1;
                return `<h${level} class="font-display font-bold text-white mt-8 mb-4">${title}</h${level}>`;
              })
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em class="text-slate-200">$1</em>')
              .replace(
                /`(.+?)`/g,
                '<code class="bg-slate-800 px-2 py-1 rounded text-accent-400">$1</code>'
              )
              .replace(
                /!\[(.+?)\]\((.+?)\)/g,
                '<div class="flex justify-center my-8"><img src="$2" alt="$1" class="max-w-2xl w-full h-auto rounded-lg shadow-lg" onerror="this.style.display=\'none\'" /></div>'
              )
              .replace(
                /\[(.+?)\]\((.+?)\)/g,
                '<a href="$2" class="text-accent-400 hover:text-accent-300 underline" target="_blank" rel="noopener noreferrer">$1</a>'
              )
              .replace(/^- (.+)/gm, '<li class="text-slate-300 ml-4">$1</li>')
              .replace(
                /(<li.*?<\/li>[\r\n]*)+/g,
                '<ul class="list-disc list-inside space-y-2 my-4">$&</ul>'
              )
              .replace(
                /^> (.+)/gm,
                '<blockquote class="border-l-4 border-accent-600 pl-6 italic text-slate-200 my-6 bg-slate-800/50 py-4 rounded-r-lg">$1</blockquote>'
              ),
          }}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-600/50 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Share Section */}
      <div className="glass-effect rounded-3xl p-8">
        <h3 className="font-display text-2xl font-bold mb-6 text-white">Share this article</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            Twitter
          </button>
          <button className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
          <button className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Copy Link
          </button>
        </div>
      </div>

      {/* Related Posts */}
      <div className="space-y-8">
        <h3 className="font-display text-2xl font-bold text-white">Related Articles</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {(await getBlogPosts(post.category))
            .filter((p) => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <div key={relatedPost.id} className="glass-effect rounded-2xl p-6 hover-lift">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="bg-slate-700 px-2 py-1 rounded text-xs">
                      {relatedPost.category}
                    </span>
                    <span>{relatedPost.read_time} min read</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white hover:text-accent-400 transition-colors">
                    <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </h4>
                  <p className="text-slate-300 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
}
