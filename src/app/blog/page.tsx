"use server";

import { posts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import BlogList from './blog-list';

export default async function BlogPage() {
  // Este es un Server Component, obtiene los datos y los pasa
  // al Client Component responsable de la renderización.
  return <BlogList posts={posts} images={PlaceHolderImages} />;
}
