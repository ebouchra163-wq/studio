'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getPostBySlug } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = React.use(params);
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/blog">
          <ChevronLeft />
          Back to Blog
        </Link>
      </Button>
      <article>
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy", { locale: enUS })}
          </time>
        </div>
        {postImage && (
          <div className="relative my-8 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={postImage.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={postImage.imageHint}
              priority
            />
          </div>
        )}
        <Separator className="my-8" />
        <div
          className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-headline prose-headings:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
