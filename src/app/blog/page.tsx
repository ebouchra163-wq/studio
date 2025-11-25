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

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const postImage = PlaceHolderImages.find(
            (img) => img.id === post.imageId
          );
          return (
            <Card key={post.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
              <Link href={`/blog/${post.slug}`} className="group">
                {postImage && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={postImage.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={postImage.imageHint}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary">
                      {post.title}
                    </CardTitle>
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
                </div>
              </Link>
              <CardFooter className="mt-auto">
                <Link href={`/blog/${post.slug}`} className="flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                  Leer más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
