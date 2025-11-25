"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Globe,
  Loader2,
  Recycle,
  Send,
  Truck,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { summarizeCustomerInquiry } from "@/ai/flows/summarize-customer-inquiries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const contactFormSchema = z.object({
  name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters."),
  email: z.string().email("Si us plau, introduïu una adreça de correu electrònic vàlida."),
  message: z.string().min(10, "El missatge ha de tenir almenys 10 caràcters."),
});

const services = [
  {
    icon: Globe,
    title: "Transport Internacional",
    description: "Enviaments fiables i eficients a tot el món.",
  },
  {
    icon: Truck,
    title: "Transport Nacional",
    description: "Serveis d'entrega ràpids i segurs dins del país.",
  },
  {
    icon: Warehouse,
    title: "Logística",
    description: "Solucions integrals per a emmagatzematge i distribució.",
  },
  {
    icon: Recycle,
    title: "Logística Inversa",
    description: "Gestió optimitzada de devolucions i cicle de vida del producte.",
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      const { summary } = await summarizeCustomerInquiry({
        inquiry: values.message,
      });
      toast({
        title: "Consulta Enviada!",
        description: (
          <div>
            <p className="font-semibold">La teva consulta ha estat resumida:</p>
            <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
          </div>
        ),
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error en enviar la consulta. Si us plau, torna-ho a provar.",
      });
    }
  }

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
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Global Cargo Care
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            El vostre soci de confiança per a solucions globals de transport i logística.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#contact">Obtenir una Cotització</Link>
          </Button>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Els Nostres Serveis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Oferim una gamma completa de serveis de transport i logística
              adaptats a les vostres necessitats.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.title}
                className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardHeader className="items-center text-center">
                  <div className="rounded-full bg-accent/20 p-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Contacta'ns
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Tens preguntes o necessites una cotització? Omple el formulari a continuació.
            </p>
          </div>
          <Card className="mx-auto mt-12 max-w-2xl">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom Complert</FormLabel>
                        <FormControl>
                          <Input placeholder="Joan Petit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correu Electrònic</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="joan.petit@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>El Teu Missatge o Consulta</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Digues-nos com et podem ajudar..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviant...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Enviar Consulta
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
