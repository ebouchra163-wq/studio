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
  origin: z.string().min(1, "El origen es obligatorio."),
  destination: z.string().min(1, "El destino is obligatorio."),
  waypoints: z.string().optional(),
  trafficConditions: z.enum(["Light", "Moderate", "Heavy"]),
  weatherConditions: z.string().min(1, "Las condiciones climáticas son obligatorias."),
  deliverySchedule: z.string().min(1, "El horario de entrega es obligatorio."),
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
      console.error("La optimización falló:", error);
      toast({
        variant: "destructive",
        title: "Optimización Fallida",
        description: "Ocurrió un error al optimizar la ruta. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Optimización de Rutas Logísticas
        </h1>
        <p className="text-muted-foreground">
          Utilice nuestra herramienta de IA para encontrar la ruta más eficiente para sus envíos.
        </p>
      </div>
      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Parámetros de la Ruta</CardTitle>
          <CardDescription>
            Rellene los detalles a continuación para generar una ruta optimizada.
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
                        <Input placeholder="p. ej., Nueva York, NY" {...field} />
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
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="p. ej., Los Ángeles, CA" {...field} />
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
                    <FormLabel>Puntos Intermedios (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="p. ej., Chicago, IL (uno por línea)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ingrese las paradas intermedias, una por línea.
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
                      <FormLabel>Condiciones del Tráfico</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione las condiciones del tráfico" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Light">Ligero</SelectItem>
                          <SelectItem value="Moderate">Moderado</SelectItem>
                          <SelectItem value="Heavy">Pesado</SelectItem>
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
                      <FormLabel>Condiciones Climáticas</FormLabel>
                      <FormControl>
                        <Input placeholder="p. ej., Cielos despejados, 24°C" {...field} />
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
                    <FormLabel>Horario de Entrega</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="p. ej., Entregar antes del 30 de julio, 5:00 PM"
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
                    Optimizando...
                  </>
                ) : (
                  <>
                    <Route className="mr-2 h-4 w-4" /> Optimizar Ruta
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
            <CardTitle>Resultado de la Optimización</CardTitle>
            <CardDescription>
              Aquí está la recomendación de ruta impulsada por IA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold">Ruta Optimizada</h3>
              <p className="text-muted-foreground">{result.optimizedRoute}</p>
            </div>
            <div>
              <h3 className="font-semibold">Tiempo Estimado de Viaje</h3>
              <p className="text-muted-foreground">
                {result.estimatedTravelTime}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Recomendaciones</h3>
              <p className="text-muted-foreground">{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
