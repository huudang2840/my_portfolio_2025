export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updatedAt: string;
  tags: string[];
  category: string;
  read_time: number;
  featured: boolean;
  published: boolean;
  image?: string;
}

export const blogCategories = [
  "Technology",
  "AI & Machine Learning",
  "Web Development",
  "Backend Systems",
  "Career",
  "Tutorials",
  "Thoughts",
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Backend Systems with Python",
    slug: "building-scalable-backend-systems-python",
    excerpt:
      "Learn how to design and implement scalable backend systems using Python, covering architecture patterns, database optimization, and performance monitoring.",
    content: `# Building Scalable Backend Systems with Python

In today's fast-paced digital world, building scalable backend systems is crucial for any successful application. This comprehensive guide will walk you through the essential concepts and best practices for creating robust, scalable systems using Python.

## Understanding Scalability

Scalability refers to a system's ability to handle increased load by adding resources. There are two main types:

- **Vertical Scaling (Scale Up)**: Adding more power to existing machines
- **Horizontal Scaling (Scale Out)**: Adding more machines to your system

## Architecture Patterns

### Microservices Architecture
Breaking down your application into smaller, independent services that can be developed, deployed, and scaled independently.

### Event-Driven Architecture
Using events to trigger and communicate between decoupled services, improving system responsiveness and scalability.

## Database Optimization

### Connection Pooling
Implement connection pooling to efficiently manage database connections and reduce overhead.

### Caching Strategies
Use Redis or Memcached to cache frequently accessed data and reduce database load.

### Database Sharding
Distribute data across multiple databases to improve performance and scalability.

## Performance Monitoring

Implement comprehensive monitoring to track system performance and identify bottlenecks early.

## Conclusion

Building scalable backend systems requires careful planning, the right architecture patterns, and continuous monitoring. By following these best practices, you can create systems that grow with your business needs.`,
    author: "Dang Nguyen",
    published_at: "2024-01-15",
    updatedAt: "2024-01-15",
    tags: ["Python", "Backend", "Scalability", "Architecture"],
    category: "Backend Systems",
    read_time: 8,
    featured: true,
    published: true,
    image: "/blogs/backend-systems.jpg",
  },
  {
    id: "2",
    title: "How I Leverage AI in My Everyday Work",
    slug: "how-i-leverage-ai-everyday-work",
    excerpt:
      "AI is transforming how we work. Here's how I use AI tools to boost productivity, improve code quality, and enhance my development workflow.",
    content: `# How I Leverage AI in My Everyday Work

Artificial Intelligence has become an integral part of my daily development workflow. From code generation to debugging, AI tools have significantly improved my productivity and code quality.

## AI-Powered Code Generation

### GitHub Copilot
Using GitHub Copilot for intelligent code completion and function generation has reduced my coding time by 30-40%.

### ChatGPT for Problem Solving
When stuck on complex problems, I use ChatGPT to brainstorm solutions and explore different approaches.

## Code Review and Quality

### Automated Code Analysis
AI tools help identify potential bugs, security vulnerabilities, and code smells before they reach production.

### Documentation Generation
AI assists in generating comprehensive documentation and comments for complex code sections.

## Learning and Research

### AI-Powered Learning
Using AI to explain complex concepts, generate examples, and create learning materials.

### Research Assistance
AI helps me stay updated with the latest technologies and best practices in software development.

## Workflow Optimization

### Task Automation
AI tools help automate repetitive tasks, allowing me to focus on more creative and strategic work.

### Meeting Summaries
AI-powered tools generate meeting summaries and action items, improving team collaboration.

## The Future of AI in Development

As AI continues to evolve, I believe it will become even more integrated into our development workflows, making us more efficient and allowing us to focus on solving complex problems.

## Conclusion

AI is not replacing developers; it's making us more powerful. By embracing AI tools, we can work smarter, not harder, and deliver better results for our users.`,
    author: "Dang Nguyen",
    published_at: "2024-01-10",
    updatedAt: "2024-01-10",
    tags: ["AI", "Productivity", "Development", "Tools"],
    category: "AI & Machine Learning",
    read_time: 6,
    featured: true,
    published: true,
    image: "/blogs/ai-workflow.jpg",
  },
  {
    id: "3",
    title: "CSS for the Shell of It",
    slug: "css-for-the-shell-of-it",
    excerpt:
      "Not all work needs to lead somewhere. Sometimes, the best learning happens when you're just experimenting and having fun with code.",
    content: `# CSS for the Shell of It

Sometimes, the most valuable learning experiences come from projects that don't have a clear end goal. This is a story about one of those projects.

## The Experiment

It started with a simple question: "What if I tried to recreate a terminal interface using only CSS?"

## The Challenge

Creating a realistic terminal interface with:
- Blinking cursor animation
- Command history
- Syntax highlighting
- Responsive design
- Smooth animations

## What I Learned

### Advanced CSS Techniques
- Complex animations and transitions
- CSS Grid and Flexbox mastery
- Custom properties and calculations
- Pseudo-elements and pseudo-classes

### The Value of Play
Sometimes, the best way to learn is to play. This project taught me more about CSS than any tutorial could.

## The Result

A fully functional terminal interface that looks and feels like the real thing, built entirely with CSS and a bit of JavaScript for interactivity.

## Key Takeaways

1. **Play is Learning**: Not every project needs to be production-ready
2. **Constraints Drive Creativity**: Working within limitations often leads to innovative solutions
3. **Details Matter**: The small touches make all the difference
4. **Community Sharing**: Sharing experimental work often helps others learn

## Conclusion

This project reminded me why I fell in love with web development in the first place - the joy of creating something cool, just because you can.

Sometimes, the best work is the work that doesn't need to lead anywhere. It's the work that feeds your curiosity and keeps your passion alive.`,
    author: "Dang Nguyen",
    published_at: "2024-01-05",
    updatedAt: "2024-01-05",
    tags: ["CSS", "Experimentation", "Learning", "Play"],
    category: "Web Development",
    read_time: 4,
    featured: false,
    published: true,
    image: "/blogs/css-terminal.jpg",
  },
];

// Server-side functions for Supabase
import { createClient, createStaticClient } from "./supabase-server";

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    published_at: data.published_at,
    updatedAt: data.updated_at,
    tags: data.tags,
    category: data.category,
    read_time: data.read_time,
    featured: data.featured,
    published: data.published,
    image: data.image_url,
  };
}

export async function getBlogPosts(
  category?: string,
  featured?: boolean,
  useStaticClient = false
): Promise<BlogPost[]> {
  const supabase = useStaticClient ? createStaticClient() : await createClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  if (featured) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    published_at: post.published_at,
    updatedAt: post.updated_at,
    tags: post.tags,
    category: post.category,
    read_time: post.read_time,
    featured: post.featured,
    published: post.published,
    image: post.image_url,
  }));
}

export function getBlogCategories(): string[] {
  return blogCategories;
}

export function getBlogTags(): string[] {
  const allTags = blogPosts.flatMap((post) => post.tags);
  return [...new Set(allTags)].sort();
}
