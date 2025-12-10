import { getPostBySlug, posts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostContent from './blog-post-content';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }
 
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
