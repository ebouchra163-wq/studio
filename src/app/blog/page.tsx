import { posts } from '@/lib/blog-posts';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Industry Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          The latest news, trends, and insights from the logistics and shipping industry.
        </p>
      </div>
      <Separator className="my-12" />

      <div className="grid gap-12">
        {posts.map((post) => {
          const postImage = PlaceHolderImages.find(
            (img) => img.id === post.imageId
          );
          return (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group">
              <Card className="grid grid-cols-1 overflow-hidden transition-all duration-300 group-hover:shadow-xl md:grid-cols-2">
                {postImage && (
                  <div className="relative h-64 w-full md:h-auto">
                    <Image
                      src={postImage.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={postImage.imageHint}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "MMMM d, yyyy", {
                          locale: enUS,
                        })}
                      </time>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
