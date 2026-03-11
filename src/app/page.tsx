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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    icon: Globe,
    title: "Enviament Internacional",
    description: "Connectem el teu negoci amb el món a través de solucions de transport marítim, aeri i terrestre. Ens encarreguem de la duana i la documentació per a un trànsit sense problemes.",
    imageId: "international-shipping",
  },
  {
    icon: Truck,
    title: "Transport Nacional",
    description: "La nostra xarxa de transport nacional garanteix entregues ràpides i segures a tot el país. Oferim seguiment en temps real i opcions de càrrega completa (FTL) i càrrega parcial (LTL).",
    imageId: "domestic-freight",
  },
  {
    icon: Warehouse,
    title: "Emmagatzematge",
    description: "Instal·lacions d'emmagatzematge modernes i segures per a les teves mercaderies. Oferim gestió d'inventari, picking i packing, i distribució per optimitzar la teva cadena de subministrament.",
    imageId: "warehousing",
  },
  {
    icon: Recycle,
    title: "Logística Inversa",
    description: "Gestionem de manera eficient el flux de retorn dels teus productes, des de devolucions de clients fins a reciclatge i disposició final, maximitzant la recuperació de valor i la sostenibilitat.",
    imageId: "reverse-logistics",
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

export default function Home() {

  return (
    <>
      <section className="relative h-[60vh] w-full overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-headline text-5xl font-extrabold md:text-7xl tracking-tighter">
            <span className="text-accent">Global</span> <span className="text-primary">Cargo Care</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-2xl font-light opacity-90">
            El vostre soci de confiança per a solucions globals d'enviament i logística.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg shadow-xl font-bold">
              <Link href="#contact">Demana un Pressupost</Link>
            </Button>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg shadow-xl font-bold">
              <Link href="#services">Els Nostres Serveis</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl text-slate-900">
              Els Nostres Serveis
            </h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded-full mb-6"></div>
            <p className="mx-auto max-w-2xl text-slate-600 md:text-xl">
              Oferim una gamma completa de serveis d'enviament i logística
              adaptats a les vostres necessitats amb tecnologia d'última generació.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
            {services.map((service) => {
              const serviceImage = PlaceHolderImages.find(
                (img) => img.id === service.imageId
              );
              return (
                <Card
                  key={service.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border-none shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {serviceImage && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={serviceImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <CardHeader className="relative">
                    <div className="absolute -top-10 left-6 bg-white p-4 rounded-xl shadow-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="pt-6 text-2xl font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl text-slate-900">
              Contacta'ns
            </h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full mb-6"></div>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 md:text-xl">
              Teniu preguntes o necessiteu una cotització personalitzada? Ompliu el formulari i ens posarem en contacte en menys de 24 hores.
            </p>
          </div>
          <Card className="mx-auto mt-12 max-w-2xl border-none shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              <form
                action="https://formspree.io/f/xyzrjdqq"
                method="POST"
                className="space-y-8"
              >
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-slate-500">Nom Complet</label>
                  <Input id="name" name="name" placeholder="Ex: Marc Sala" required className="bg-slate-50 border-none h-14 text-lg rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-500">Adreça de Correu Electrònic</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="marc.sala@exemple.com"
                    required
                    className="bg-slate-50 border-none h-14 text-lg rounded-xl focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-slate-500">La Teva Consulta</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Explica'ns els detalls del teu enviament..."
                    className="min-h-[150px] bg-slate-50 border-none text-lg rounded-xl focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-16 text-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 rounded-xl"
                >
                  <Send className="mr-3 h-6 w-6" /> Envia la Consulta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
