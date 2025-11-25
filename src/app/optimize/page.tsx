"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Route } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  OptimizeTransportRoutesInput,
  OptimizeTransportRoutesOutput,
  optimizeTransportRoutes,
} from "@/ai/flows/optimize-transport-routes";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  origin: z.string().min(1, "L'origen és obligatori."),
  destination: z.string().min(1, "La destinació és obligatòria."),
  waypoints: z.string().optional(),
  trafficConditions: z.enum(["Light", "Moderate", "Heavy"]),
  weatherConditions: z.string().min(1, "Les condicions climàtiques són obligatòries."),
  deliverySchedule: z.string().min(1, "L'horari d'entrega és obligatori."),
});

export default function OptimizePage() {
  const { toast } = useToast();
  const [result, setResult] = useState<OptimizeTransportRoutesOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      waypoints: "",
      trafficConditions: "Moderate",
      weatherConditions: "",
      deliverySchedule: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const input: OptimizeTransportRoutesInput = {
      ...values,
      waypoints: values.waypoints
        ? values.waypoints.split("\n").filter((w) => w.trim() !== "")
        : [],
    };

    try {
      const optimizationResult = await optimizeTransportRoutes(input);
      setResult(optimizationResult);
    } catch (error) {
      console.error("L'optimització ha fallat:", error);
      toast({
        variant: "destructive",
        title: "Optimització Fallida",
        description: "S'ha produït un error en optimitzar la ruta. Si us plau, intenta-ho de nou.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Optimització de Rutes Logístiques
        </h1>
        <p className="text-muted-foreground">
          Utilitzeu la nostra eina d'IA per trobar la ruta més eficient per als vostres enviaments.
        </p>
      </div>
      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Paràmetres de la Ruta</CardTitle>
          <CardDescription>
            Ompliu els detalls a continuació per generar una ruta optimitzada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origen</FormLabel>
                      <FormControl>
                        <Input placeholder="p. ex., Nova York, NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destinació</FormLabel>
                      <FormControl>
                        <Input placeholder="p. ex., Los Angeles, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="waypoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Punts Intermedis (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="p. ex., Chicago, IL (un per línia)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Introduïu les parades intermèdies, una per línia.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="trafficConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condicions del Trànsit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccioneu les condicions del trànsit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Light">Lleuger</SelectItem>
                          <SelectItem value="Moderate">Moderat</SelectItem>
                          <SelectItem value="Heavy">Pesat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condicions Climàtiques</FormLabel>
                      <FormControl>
                        <Input placeholder="p. ex., Cel clar, 24°C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="deliverySchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horari d'Entrega</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="p. ex., Entregar abans del 30 de juliol, 5:00 PM"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimitzant...
                  </>
                ) : (
                  <>
                    <Route className="mr-2 h-4 w-4" /> Optimitzar Ruta
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resultat de l'Optimització</CardTitle>
            <CardDescription>
              Aquí teniu la recomanació de ruta impulsada per IA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold">Ruta Optimitzada</h3>
              <p className="text-muted-foreground">{result.optimizedRoute}</p>
            </div>
            <div>
              <h3 className="font-semibold">Temps Estimat de Viatge</h3>
              <p className="text-muted-foreground">
                {result.estimatedTravelTime}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Recomanacions</h3>
              <p className="text-muted-foreground">{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
