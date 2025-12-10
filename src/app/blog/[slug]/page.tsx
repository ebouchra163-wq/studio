'use server';

import { getPostBySlug, posts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostContent from './blog-post-content';

// generateStaticParams runs on the server at build time
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // This is a Server Component, it fetches data and passes it
  // to the Client Component responsible for rendering.
  return <BlogPostContent post={post} />;
}
