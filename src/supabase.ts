import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Profile = {
  id: string;
  name: string;
  bio: string;
  video_url: string | null;
  updated_at: string;
};

export type ShelfItem = {
  id: string;
  title: string;
  type: 'book' | 'show' | 'movie' | 'article';
  status: 'currently' | 'completed' | 'queued';
  cover_image_url?: string;
  author_or_creator?: string;
  thoughts_or_review?: string;
  rating?: number;
  link?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  cover_image_url?: string;
  github_url?: string;
  tags?: string[];
  is_featured: boolean;
};

export type InstagramPost = {
  id: string;
  post_id: string;
  caption?: string;
  image_url: string;
  post_url: string;
  created_at: string;
};

// src/lib/supabase.ts
export function getIntroVideoUrl() {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_video/intro.mp4`;
}