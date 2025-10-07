import BlogCard from "@/components/BlogCard";
import { getBlogPosts, getBlogCategories, getBlogTags } from "@/lib/blog-data";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function BlogsPage() {
  const allPosts = await getBlogPosts();
  const featuredPosts = await getBlogPosts(undefined, true);
  const categories = getBlogCategories();
  const tags = getBlogTags();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="text-center space-y-8 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white  ">Blog</h1>
        <p className="text-xl text-slate-400   max-w-3xl mx-auto leading-relaxed">
          Sharing thoughts, insights, and knowledge about software development, AI, and the
          ever-evolving world of technology.
        </p>
      </header>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
              Featured Posts
            </h2>
            <p className="text-slate-400   text-lg">My most popular and insightful articles</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
              All Posts
            </h2>
            <p className="text-slate-400   text-lg">
              {allPosts.length} articles about technology and development
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Categories & Tags */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
            Explore by Topic
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Categories */}
          <div className="glass-effect rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-white  ">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="bg-accent-600/20 text-accent-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-600/30 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="glass-effect rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-white  ">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 12).map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-600/50 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="text-center">
        <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white  ">
            Stay Updated
          </h3>
          <p className="text-slate-300   text-lg mb-6">
            Get notified when I publish new articles about development, AI, and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            <button className="bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
