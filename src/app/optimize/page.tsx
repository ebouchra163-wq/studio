"use client";

import { AlertCircle, Route } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function OptimizePage() {
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
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Funcionalidad no disponible</AlertTitle>
            <AlertDescription>
              La optimización de rutas mediante IA no está disponible en el modo de exportación estática. Esta característica requiere un entorno de servidor Node.js.
            </AlertDescription>
          </Alert>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              El formulario de optimización de rutas está desactivado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
