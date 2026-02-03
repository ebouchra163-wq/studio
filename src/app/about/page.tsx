'use client';

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
          Sobre Global Cargo Care
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Connectant el món amb solucions logístiques <strong>fiables i eficients</strong>.
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
          <h2 className="text-3xl font-bold">La Nostra Trajectòria</h2>
          <p className="text-lg text-muted-foreground">
            Des de <strong>2010</strong>, la nostra missió ha estat <strong>simplificar la logística global</strong>. Vam començar com un petit equip amb un gran somni: fer que l'enviament internacional fos <strong>accessible, transparent i eficient</strong>.
          </p>
          <p className="text-lg text-muted-foreground">
            Avui, som un <strong>soci logístic de confiança</strong> amb una xarxa mundial, reconeguts per la nostra <strong>fiabilitat, innovació</strong> i un servei al client excepcional.
          </p>
        </div>
      </div>

      <Separator className="my-12 md:my-20" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <Card className="flex flex-col items-center p-4 text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-8 w-8" />
            </div>
            <CardTitle>La Nostra Missió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Impulsar l'èxit dels nostres clients amb <strong>solucions logístiques superiors</strong>, garantint entregues <strong>puntuals i segures</strong> a tot el món.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-4 text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle>La Nostra Visió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser el proveïdor de logística <strong>líder mundial en servei al client</strong>, construint relacions duradores basades en la <strong>confiança i l'excel·lència</strong>.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-4 text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle>Els Nostres Valors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <strong>Integritat, Fiabilitat, Innovació</strong> i una dedicació total a <strong>l'èxit del client</strong>. Són els pilars de cada decisió que prenem.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 md:mt-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Per Què Triar-nos?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
            <Clock className="h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Experiència Provada</h3>
            <p className="mt-2 text-muted-foreground">Més d'una dècada liderant la indústria logística.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
            <Globe className="h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Abast Global</h3>
            <p className="mt-2 text-muted-foreground">Connectem els principals ports i ciutats del món.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
            <Ship className="h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Solucions a Mida</h3>
            <p className="mt-2 text-muted-foreground">Serveis adaptats a les teves necessitats úniques.</p>
          </Card>
        </div>
      </div>

    </div>
  );
}
