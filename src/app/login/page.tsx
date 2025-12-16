"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  user: z.string().min(1, { message: "L'usuari és requerit." }),
  password: z.string().min(1, { message: "La contrasenya és requerida." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface UserData {
  user: string;
  nom: string;
  empresa: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/n5eliliog16ts/search?sheet=usuaris&user=${data.user}&password=${data.password}`
      );
      
      const result: UserData[] = await response.json();

      if (response.ok && result.length > 0) {
        // Guardar dades al localStorage
        localStorage.setItem("userName", result[0].nom);
        localStorage.setItem("userCompany", result[0].empresa);
        // Redirigir al dashboard
        router.push("/dashboard");
        router.refresh(); // Força l'actualització de la barra de navegació
      } else {
        setError("Dades incorrectes. Revisa l'usuari i la contrasenya.");
      }
    } catch (err) {
      setError("No s'ha pogut connectar amb el servidor. Intenta-ho més tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Accés d'Usuari</CardTitle>
          <CardDescription>
            Introdueix les teves credencials per accedir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuari</Label>
              <Input
                id="user"
                placeholder="El teu usuari"
                {...form.register("user")}
                disabled={loading}
              />
              {form.formState.errors.user && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.user.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contrasenya</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                disabled={loading}
              />
              {form.formState.errors.password && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error d'accés</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {loading ? "Entrant..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <div className="mb-4 mt-2 text-center text-sm">
          No tens un compte?{" "}
          <Link href="/signup" className="underline">
            Registra't
          </Link>
        </div>
      </Card>
    </div>
  );
}
