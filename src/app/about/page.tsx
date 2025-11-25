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
          Conectando el mundo con soluciones logísticas fiables y eficientes, un
          envío a la vez.
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
          <h2 className="text-3xl font-bold">Nuestra Historia</h2>
          <p className="text-muted-foreground">
            Fundada en 2010, Global Cargo Care nació de una visión para
            simplificar la logística global. Empezamos con un pequeño equipo y un
            gran sueño: hacer que el envío internacional sea accesible, transparente,
            y sin interrupciones para empresas de todos los tamaños.
          </p>
          <p className="text-muted-foreground">
            A lo largo de los años, nos hemos convertido en un socio logístico de confianza,
            conocido por nuestro compromiso con la fiabilidad, la innovación y
            un servicio al cliente excepcional. Nuestra red se extiende por todo el mundo, pero
            nuestro enfoque sigue siendo personal.
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
            <CardTitle>Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Proporcionar soluciones logísticas superiores que impulsen el crecimiento
              y el éxito de nuestros clientes, garantizando la entrega puntual y segura de
              sus mercancías en cualquier parte del mundo.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle>Nuestra Visión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser el proveedor de logística más centrado en el cliente del mundo,
              estableciendo el estándar de excelencia en la industria y construyendo
              relaciones duraderas basadas en la confianza.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle>Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Integridad, fiabilidad, innovación y una dedicación incesante
              al éxito de nuestros clientes. Estos principios guían cada una de nuestras
              acciones y decisiones.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-lg bg-accent/20 p-8 md:mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">¿Por Qué Elegirnos?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Años de Experiencia</h3>
              <p className="text-muted-foreground">Más de una década liderando la industria logística.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Alcance Global</h3>
              <p className="text-muted-foreground">Una red que conecta los principales puertos y ciudades de todo el mundo.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Ship className="mt-1 h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Soluciones a Medida</h3>
              <p className="text-muted-foreground">Servicios adaptados a sus necesidades específicas de envío.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
