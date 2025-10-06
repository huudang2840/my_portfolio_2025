import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
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
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          published_at?: string;
          updated_at?: string;
          tags?: string[];
          category: string;
          read_time?: number;
          featured?: boolean;
          published?: boolean;
          image_url?: string | null;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          published_at?: string;
          updated_at?: string;
          tags?: string[];
          category?: string;
          read_time?: number;
          featured?: boolean;
          published?: boolean;
          image_url?: string | null;
          created_at?: string;
          user_id?: string;
        };
      };
    };
  };
}
