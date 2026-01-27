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
  origin: z.string().min(1, { message: "L'origen és requerit." }),
  destination: z.string().min(1, { message: "El destí és requerit." }),
  waypoints: z.string().optional(),
  trafficConditions: z.string().min(1, { message: "Les condicions del trànsit són requerides." }),
  weatherConditions: z.string().min(1, { message: "Les condicions climàtiques són requerides." }),
  deliverySchedule: z.string().min(1, { message: "L'horari d'entrega és requerit." }),
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
      weatherConditions: "Serè",
      deliverySchedule: "Qualsevol hora durant el dia",
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
      setError("Hi ha hagut un error en optimitzar la ruta. Si us plau, torna-ho a intentar.");
    } finally {
      setLoading(false);
    }
  };

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
          <CardTitle className="flex items-center gap-2">
            <Route className="h-6 w-6" /> Paràmetres de Ruta
          </CardTitle>
          <CardDescription>
            Ompliu els detalls a continuació per generar una ruta optimitzada.
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
                        <Input placeholder="Ex: Madrid, Espanya" {...field} />
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
                      <FormLabel>Destí</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Barcelona, Espanya" {...field} />
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
                    <FormLabel>Punts intermedis (separats per comes)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Saragossa, Lleida" {...field} />
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
                    <FormLabel>Condicions del Trànsit</FormLabel>
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
                    <FormLabel>Condicions Climàtiques</FormLabel>
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
                    <FormLabel>Horari d'Entrega</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Optimitzant..." : "Optimitza la Ruta"}
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
            <CardTitle>Ruta Optimitzada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h3 className="font-semibold">Ruta Suggerida:</h3>
                <p className="text-muted-foreground">{result.optimizedRoute}</p>
             </div>
             <div>
                <h3 className="font-semibold">Temps Estimat de Viatge:</h3>
                <p className="text-muted-foreground">{result.estimatedTravelTime}</p>
             </div>
             <div>
                <h3 className="font-semibold">Recomanacions:</h3>
                <p className="text-muted-foreground">{result.recommendations}</p>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
