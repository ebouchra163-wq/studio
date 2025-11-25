import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, MapPin } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Cuenta de Cliente</h1>
        <p className="text-muted-foreground">
          Gestiona tu perfil, direcciones y envíos.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <User className="h-8 w-8 text-primary" />
              <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-medium">Jane Doe</p>
              <p className="text-sm text-muted-foreground">
                jane.doe@example.com
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Editar Perfil
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información de Dirección</CardTitle>
              <CardDescription>
                Gestiona tus direcciones de facturación y envío.
              </-carddescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">Dirección de Facturación</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>123 Calle Falsa</p>
                    <p>Metropolis, NY 10001</p>
                    <p>Estados Unidos</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">Dirección de Envío</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>456 Evergreen Terrace</p>
                    <p>Gotham, NJ 07001</p>
                    <p>Estados Unidos</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Editar Direcciones
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
