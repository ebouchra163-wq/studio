"use client";

import { AlertCircle, Route, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  optimizeTransportRoutes,
  type OptimizeTransportRoutesOutput,
} from "@/ai/flows/optimize-transport-routes";

const formSchema = z.object({
  origin: z.string().min(1, { message: "El origen es requerido." }),
  destination: z.string().min(1, { message: "El destino es requerido." }),
  waypoints: z.string().optional(),
  trafficConditions: z.string().min(1, { message: "Las condiciones del tráfico son requeridas." }),
  weatherConditions: z.string().min(1, { message: "Las condiciones climáticas son requeridas." }),
  deliverySchedule: z.string().min(1, { message: "El horario de entrega es requerido." }),
});

export default function OptimizePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeTransportRoutesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      waypoints: "",
      trafficConditions: "Normal",
      weatherConditions: "Despejado",
      deliverySchedule: "Cualquier hora durante el día",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const waypointsArray = values.waypoints?.split(',').map(wp => wp.trim()).filter(Boolean);
      const apiResult = await optimizeTransportRoutes({ ...values, waypoints: waypointsArray });
      setResult(apiResult);
    } catch (e) {
      console.error(e);
      setError("Hubo un error al optimizar la ruta. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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
          <CardTitle className="flex items-center gap-2">
            <Route className="h-6 w-6" /> Parámetros de Ruta
          </CardTitle>
          <CardDescription>
            Rellene los detalles a continuación para generar una ruta optimizada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origen</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Madrid, España" {...field} />
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
                        <Input placeholder="Ej: Barcelona, España" {...field} />
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
                    <FormLabel>Puntos intermedios (separados por comas)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Zaragoza, Lérida" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trafficConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condiciones del Tráfico</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="deliverySchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario de Entrega</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Optimizando..." : "Optimizar Ruta"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      
      {error && (
         <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
      )}

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ruta Optimizada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h3 className="font-semibold">Ruta Sugerida:</h3>
                <p className="text-muted-foreground">{result.optimizedRoute}</p>
             </div>
             <div>
                <h3 className="font-semibold">Tiempo Estimado de Viaje:</h3>
                <p className="text-muted-foreground">{result.estimatedTravelTime}</p>
             </div>
             <div>
                <h3 className="font-semibold">Recomendaciones:</h3>
                <p className="text-muted-foreground">{result.recommendations}</p>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
