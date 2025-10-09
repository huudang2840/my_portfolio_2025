"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import MarkdownEditor from "@/components/MarkdownEditor";
import ImageUpload from "@/components/ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updated_at: string;
  tags: string[];
  category: string;
  read_time: number;
  featured: boolean;
  published: boolean;
  image_url: string | null;
  user_id: string;
}

const blogCategories = [
  "Technology",
  "AI & Machine Learning",
  "Web Development",
  "Backend Systems",
  "Career",
  "Tutorials",
  "Thoughts",
];

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setUser(user);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);

        if (error) {
          console.error("Error deleting post:", error);
          return;
        }

        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSave = async (postData: Partial<BlogPost>) => {
    if (!user) return;

    try {
      if (isEditing && selectedPost) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: postData.title,
            slug: postData.title
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, ""),
            excerpt: postData.excerpt,
            content: postData.content,
            category: postData.category,
            tags: postData.tags,
            read_time: postData.read_time,
            featured: postData.featured,
            published: postData.published,
            image_url: postData.image_url,
          })
          .eq("id", selectedPost.id);

        if (error) {
          console.error("Error updating post:", error);
          return;
        }
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert({
          title: postData.title || "",
          slug:
            postData.title
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "") || "",
          excerpt: postData.excerpt || "",
          content: postData.content || "",
          author: user.user_metadata?.full_name || user.email || "Dang Nguyen",
          category: postData.category || "",
          tags: postData.tags || [],
          read_time: postData.read_time || 5,
          featured: postData.featured || false,
          published: postData.published || false,
          image_url: postData.image_url || null,
          user_id: user.id,
        });

        if (error) {
          console.error("Error creating post:", error);
          return;
        }
      }

      // Refresh posts
      await fetchPosts();
      setShowForm(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white">Blog Admin</h1>
            <p className="text-slate-400 mt-2">Manage your blog posts and content</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-8 h-8 bg-accent-600/20 rounded-full flex items-center justify-center">
                <span className="text-accent-400 text-sm font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm">{user?.email}</span>
            </div>
            <button
              onClick={handleNewPost}
              className="bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
            >
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="bg-slate-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="cta-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white">{posts.length}</h3>
            <p className="text-slate-400">Total Posts</p>
          </div>
          <div className="cta-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white">
              {posts.filter((p) => p.published).length}
            </h3>
            <p className="text-slate-400">Published</p>
          </div>
          <div className="cta-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white">
              {posts.filter((p) => p.featured).length}
            </h3>
            <p className="text-slate-400">Featured</p>
          </div>
          <div className="cta-card rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white">
              {Math.round(posts.reduce((acc, post) => acc + post.read_time, 0) / posts.length)} min
            </h3>
            <p className="text-slate-400">Avg Read Time</p>
          </div>
        </div>

        {/* Posts Table */}
        <div className="cta-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-300">Title</th>
                  <th className="text-left p-4 font-medium text-slate-300">Category</th>
                  <th className="text-left p-4 font-medium text-slate-300">Status</th>
                  <th className="text-left p-4 font-medium text-slate-300">Date</th>
                  <th className="text-left p-4 font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-primary/10 hover:bg-slate-800/50">
                    <td className="p-4">
                      <div>
                        <h4 className="font-medium text-white">{post.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-700 px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {post.published && (
                          <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                            Published
                          </span>
                        )}
                        {post.featured && (
                          <span className="bg-accent-600/20 text-accent-400 px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">
                      {new Date(post.published_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-accent-400 hover:text-accent-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <PostForm
            post={selectedPost}
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setSelectedPost(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

interface PostFormProps {
  post: BlogPost | null;
  isEditing: boolean;
  onSave: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
}

function PostForm({ post, isEditing, onSave, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "",
    tags: post?.tags.join(", ") || "",
    read_time: post?.read_time || 5,
    featured: post?.featured || false,
    published: post?.published || false,
    image_url: post?.image_url || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-white">
            {isEditing ? "Edit Post" : "New Post"}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              >
                <option value="">Select category</option>
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>

          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Write your blog post content in Markdown..."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Python, Backend, AI"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Read Time (minutes)
              </label>
              <input
                type="number"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                min="1"
              />
            </div>
          </div>

          <ImageUpload
            onUpload={(url) => setFormData({ ...formData, image_url: url })}
            currentImage={formData.image_url}
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-accent-600 bg-slate-700 border-primary/20 rounded focus:ring-accent-500"
              />
              <span className="text-slate-300">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-accent-600 bg-slate-700 border-primary/20 rounded focus:ring-accent-500"
              />
              <span className="text-slate-300">Published</span>
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="bg-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
            >
              {isEditing ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
