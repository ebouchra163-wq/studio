"use server";

import { posts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import BlogList from './blog-list';

export default function BlogPage() {
  // Aquest és un Server Component, obté les dades i les passa
  // al Client Component responsable de la renderització.
  return <BlogList posts={posts} images={PlaceHolderImages} />;
}
