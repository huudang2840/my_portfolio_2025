# Supabase Setup Guide

## 1. Tạo Supabase Project

1. Truy cập [supabase.com](https://supabase.com)
2. Đăng ký/đăng nhập tài khoản
3. Tạo project mới
4. Lưu lại **Project URL** và **anon public key**

## 2. Cấu hình Environment Variables

Tạo file `.env.local` trong root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Setup Database

1. Vào **SQL Editor** trong Supabase Dashboard
2. Chạy script trong file `supabase-schema.sql`:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    read_time INTEGER DEFAULT 5,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_user_id ON public.blog_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own blog posts" ON public.blog_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own blog posts" ON public.blog_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blog posts" ON public.blog_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blog posts" ON public.blog_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER handle_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
```

## 4. Setup Storage

1. Vào **Storage** trong Supabase Dashboard
2. Tạo bucket mới với tên `blog-images`
3. Set bucket là **Public**
4. Chạy script storage policies:

```sql
-- Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
    FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own blog images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own blog images" ON storage.objects
    FOR DELETE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 5. Setup Authentication

1. Vào **Authentication** > **Settings**
2. Cấu hình **Site URL**: `http://localhost:3000` (development)
3. Thêm **Redirect URLs**:
   - `http://localhost:3000/admin`
   - `https://yourdomain.com/admin`
4. Enable **Google OAuth** (optional):
   - Vào **Authentication** > **Providers**
   - Enable Google provider
   - Thêm Google OAuth credentials

## 6. Chạy ứng dụng

```bash
npm run dev
```

## 7. Sử dụng

1. **Truy cập `/auth/register`** để tạo tài khoản
2. **Truy cập `/auth/login`** để đăng nhập
3. **Truy cập `/admin`** để quản lý blog (cần đăng nhập)
4. **Truy cập `/blogs`** để xem blog posts

## Tính năng đã tích hợp:

✅ **Authentication**: Đăng ký, đăng nhập, Google OAuth
✅ **Database**: PostgreSQL với Row Level Security
✅ **Storage**: Upload và quản lý hình ảnh
✅ **Markdown Editor**: Editor với toolbar và preview
✅ **Image Upload**: Upload hình ảnh trực tiếp vào Supabase Storage
✅ **CRUD Operations**: Tạo, đọc, sửa, xóa blog posts
✅ **Admin Protection**: Bảo vệ routes admin với middleware
✅ **Real-time**: Cập nhật dữ liệu real-time từ Supabase

## Cấu trúc Database:

- **blog_posts**: Lưu trữ thông tin blog posts
- **auth.users**: Quản lý người dùng (từ Supabase Auth)
- **storage.blog-images**: Lưu trữ hình ảnh blog

## Security:

- Row Level Security (RLS) được bật
- Chỉ user đã đăng nhập mới có thể tạo/sửa/xóa posts
- Mọi người có thể xem published posts
- Hình ảnh được bảo vệ theo user
