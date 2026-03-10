
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
  email: z.string().email({ message: "Introdueix un correu electrònic vàlid." }),
  password: z.string().min(6, { message: "La contrasenya ha de tenir almenys 6 caràcters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const SHEETDB_USERS_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts?sheet=usuaris';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SHEETDB_USERS_URL);
      const users = await response.json();
      
      const user = users.find(
        (u: any) => u.usuari.toLowerCase() === data.email.toLowerCase() && String(u.password) === data.password
      );

      if (user) {
        localStorage.setItem('userName', user.usuari);
        localStorage.setItem('userRole', user.rol);
        localStorage.setItem('userFullName', user.nom);
        
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Correu o contrasenya incorrectes.");
      }
    } catch (err) {
      setError("S'ha produït un error en l'inici de sessió. Revisa la teva connexió.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-4 py-20">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Accés d'Usuari</CardTitle>
          <CardDescription>
            Introdueix les teves credencials per accedir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correu Electrònic</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuari@exemple.com"
                {...form.register("email")}
                disabled={loading}
              />
              {form.formState.errors.email && (
                <p className="text-xs font-medium text-destructive">{form.formState.errors.email.message}</p>
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
                <p className="text-xs font-medium text-destructive">{form.formState.errors.password.message}</p>
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
              {loading ? "Iniciant..." : "Entra"}
            </Button>
          </form>
        </CardContent>
        <div className="mb-6 mt-2 text-center text-sm">
          No tens un compte?{" "}
          <Link href="/signup" className="underline font-semibold text-primary">
            Registra't ara
          </Link>
        </div>
      </Card>
    </div>
  );
}
