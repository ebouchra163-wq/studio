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
import { es } from 'date-fns/locale';
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog de la Indústria</h1>
        <p className="text-muted-foreground">
          Les últimes notícies, tendències i coneixements del sector de la logística i el transport.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <Card className="transform-gpu transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl hover:text-primary">
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
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
