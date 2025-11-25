import { posts } from '@/lib/blog-posts';
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
import { es } from 'date-fns/locale';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog de la Industria</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Las últimas noticias, tendencias y conocimientos de la industria de la logística y el transporte.
        </p>
      </div>
      <Separator className="my-12" />

      <div className="grid grid-cols-1 gap-12">
        {posts.map((post) => {
          const postImage = PlaceHolderImages.find(
            (img) => img.id === post.imageId
          );
          return (
            <Card key={post.id} className="transition-all duration-300 hover:shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {postImage && (
                  <div className="relative h-64 w-full md:h-full">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={postImage.imageUrl}
                        alt={post.title}
                        fill
                        className="rounded-t-lg object-cover md:rounded-l-lg md:rounded-t-none"
                        data-ai-hint={postImage.imageHint}
                      />
                    </Link>
                  </div>
                )}
                <div className="flex flex-col md:col-span-2">
                  <CardHeader>
                    <Link href={`/blog/${post.slug}`} className="group">
                      <CardTitle className="text-xl group-hover:text-primary">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-2 pt-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", {
                          locale: es,
                        })}
                      </time>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                      Leer más
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
