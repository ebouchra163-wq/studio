'use client';

import {
  Globe,
  Recycle,
  Send,
  Truck,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    icon: Globe,
    title: "Envío Internacional",
    description: "Conectamos tu negocio con el mundo a través de soluciones de flete marítimo, aéreo y terrestre. Nos encargamos de la aduana y la documentación para un tránsito sin problemas.",
    imageId: "international-shipping",
  },
  {
    icon: Truck,
    title: "Transporte Nacional",
    description: "Nuestra red de transporte nacional garantiza entregas rápidas y seguras en todo el país. Ofrecemos seguimiento en tiempo real y opciones de carga completa (FTL) y carga parcial (LTL).",
    imageId: "domestic-freight",
  },
  {
    icon: Warehouse,
    title: "Almacenamiento",
    description: "Instalaciones de almacenamiento modernas y seguras para tus mercancías. Ofrecemos gestión de inventario, picking y packing, y distribución para optimizar tu cadena de suministro.",
    imageId: "warehousing",
  },
  {
    icon: Recycle,
    title: "Logística Inversa",
    description: "Gestionamos de manera eficiente el flujo de retorno de tus productos, desde devoluciones de clientes hasta reciclaje y disposición final, maximizando la recuperación de valor y la sostenibilidad.",
    imageId: "reverse-logistics",
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

export default function Home() {

  return (
    <>
      <section className="relative h-[60vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            <span className="text-orange-500">Global</span> <span className="text-white">Cargo Care</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Su socio de confianza para soluciones globales de envío y logística.
          </p>
          <Button asChild size="lg" className="mt-8 bg-black text-white hover:bg-black/80">
            <Link href="#contact">Obtener una Cotización</Link>
          </Button>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Ofrecemos una gama completa de servicios de envío y logística
              adaptados a sus necesidades.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {services.map((service, index) => {
                const serviceImage = PlaceHolderImages.find(
                  (img) => img.id === service.imageId
                );
                return (
                  <AccordionItem value={`item-${index}`} key={service.title}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4 text-lg font-semibold text-primary">
                        <service.icon className="h-8 w-8" />
                        {service.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                          <p className="text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        {serviceImage && (
                          <div className="relative h-40 w-full overflow-hidden rounded-lg">
                            <Image
                              src={serviceImage.imageUrl}
                              alt={service.title}
                              fill
                              className="object-cover"
                              data-ai-hint={serviceImage.imageHint}
                            />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Contáctanos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              ¿Tiene preguntas o necesita una cotización? Rellene el siguiente formulario.
            </p>
          </div>
          <Card className="mx-auto mt-12 max-w-2xl">
            <CardContent className="p-6">
              <form
                action="https://formspree.io/f/xyzrjdqq"
                method="POST"
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nombre Completo</label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Dirección de Correo Electrónico</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Su Mensaje o Consulta</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntenos cómo podemos ayudarle..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" /> Enviar Consulta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
