import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Users, Ship, Globe, Clock } from 'lucide-react';

const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          About Global Cargo Care
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Connecting the world with reliable and efficient logistics solutions, one
          shipment at a time.
        </p>
      </div>
      
      <div className="my-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg md:h-[400px]">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, Global Cargo Care was born from a vision to
            simplify global logistics. We started with a small team and a
            big dream: to make international shipping accessible, transparent,
            and seamless for businesses of all sizes.
          </p>
          <p className="text-muted-foreground">
            Over the years, we have grown into a trusted logistics partner,
            known for our commitment to reliability, innovation, and
            exceptional customer service. Our network spans the globe, yet
            our focus remains personal.
          </p>
        </div>
      </div>

      <Separator className="my-12 md:my-20" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-8 w-8" />
            </div>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide superior logistics solutions that power our clients'
              growth and success, ensuring the timely and safe delivery of
              their goods anywhere in the world.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the world's most customer-centric logistics provider,
              setting the standard for excellence in the industry and building
              lasting relationships based on trust.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Integrity, reliability, innovation, and a relentless dedication
              to our customers' success. These principles guide our every
              action and decision.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-lg bg-accent/20 p-8 md:mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">Why Choose Us?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Years of Experience</h3>
              <p className="text-muted-foreground">Over a decade of leading the logistics industry.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Global Reach</h3>
              <p className="text-muted-foreground">A network connecting major ports and cities worldwide.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Ship className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Tailored Solutions</h3>
              <p className="text-muted-foreground">Services adapted to your specific shipping needs.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
