'use server';

import { getPostBySlug, posts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostContent from './blog-post-content';

// generateStaticParams runs on the server at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Aquest és un Server Component, obté les dades i les passa
  // al Client Component responsable de la renderització.
  return <BlogPostContent post={post} />;
}
