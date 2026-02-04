'use client';

import type { Post } from '@/lib/blog-posts';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { ca } from 'date-fns/locale';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface BlogListProps {
  posts: Post[];
  images: ImagePlaceholder[];
}

export default function BlogList({ posts, images }: BlogListProps) {
  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Blog de la Indústria
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Les últimes notícies, tendències i coneixements de la indústria de la
          logística i el transport.
        </p>
      </div>
      <Separator className="my-12" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {posts.map((post) => {
          const postImage = images.find((img) => img.id === post.imageId);
          return (
            <Card
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {postImage && (
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={postImage.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={postImage.imageHint}
                    />
                  </div>
                </Link>
              )}
              <div className="flex flex-1 flex-col">
                <CardHeader>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="text-2xl group-hover:text-primary">
                      {post.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="flex items-center gap-2 pt-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", {
                        locale: ca,
                      })}
                    </time>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Llegeix més
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
