'use server';

import { getPostBySlug, posts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostContent from './blog-post-content';

type Props = {
  params: Promise<{ slug: string }>;
};

// generateStaticParams runs on the server at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  // En Next.js 15, params és una promesa i s'ha d'esperar.
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Aquest és un Server Component, obté les dades i les passa
  // al Client Component responsable de la renderització.
  return <BlogPostContent post={post} />;
}
