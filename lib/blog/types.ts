export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostListItem = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "cover_image_url" | "published_at" | "author"
>;

export type BlogPostAdmin = BlogPost;
