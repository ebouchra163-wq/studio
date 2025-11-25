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
          Connectant el món amb solucions logístiques fiables i eficients, un
          enviament a la vegada.
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
          <h2 className="text-3xl font-bold">La Nostra Història</h2>
          <p className="text-muted-foreground">
            Fundada el 2010, Global Cargo Care va néixer de la visió de
            simplificar la logística global. Vam començar amb un petit equip i
            un gran somni: fer que el transport marítim internacional fos
            accessible, transparent i fluid per a empreses de totes les mides.
          </p>
          <p className="text-muted-foreground">
            Al llarg dels anys, hem crescut fins a convertir-nos en un soci
            logístic de confiança, conegut pel nostre compromís amb la fiabilitat,
            la innovació i un servei al client excepcional. La nostra xarxa
            s'estén per tot el món, però el nostre enfocament es manté personal.
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
            <CardTitle>La Nostra Missió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Oferir solucions logístiques superiors que impulsin el creixement
              i l'èxit dels nostres clients, garantint l'entrega puntual i segura
              dels seus béns a qualsevol part del món.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle>La Nostra Visió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser el proveïdor de logística més centrat en el client del món,
              establert l'estàndard d'excel·lència en la indústria i creant
              relacions duradores basades en la confiança.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle>Els Nostres Valors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Integritat, fiabilitat, innovació i una dedicació incansable a
              l'èxit dels nostres clients. Aquests principis guien totes les
              nostres accions i decisions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-lg bg-accent/20 p-8 md:mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">Per Què Escollir-nos?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Anys d'Experiència</h3>
              <p className="text-muted-foreground">Més d'una dècada liderant la indústria logística.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Abast Global</h3>
              <p className="text-muted-foreground">Una xarxa que connecta els principals ports i ciutats del món.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Ship className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Solucions a Mida</h3>
              <p className="text-muted-foreground">Serveis adaptats a les teves necessitats específiques d'enviament.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
