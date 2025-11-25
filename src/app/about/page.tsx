import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Users } from 'lucide-react';

const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Sobre Global Cargo Care
        </h1>
        <p className="mx-auto max-w-3xl text-muted-foreground md:text-lg">
          Connectant el món amb solucions logístiques fiables i eficients, un
          enviament a la vegada.
        </p>
      </div>
      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">La Nostra Història</h2>
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
        <div className="relative h-80 w-full overflow-hidden rounded-lg">
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
      </div>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="pt-4">La Nostra Missió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Oferir solucions logístiques superiors que impulsin el creixement
              i l'èxit dels nostres clients, garantint l'entrega puntual i segura
              dels seus béns a qualsevol part del món.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="pt-4">La Nostra Visió</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser el proveïdor de logística més centrat en el client del món,
              establert l'estàndard d'excel·lència en la indústria i creant
              relacions duradores basades en la confiança.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="pt-4">Els Nostres Valors</CardTitle>
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
    </div>
  );
}
