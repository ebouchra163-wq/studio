
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
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "El nom és massa curt." }),
  email: z.string().email({ message: "Introdueix un correu electrònic vàlid." }),
  password: z.string().min(6, { message: "La contrasenya ha de tenir almenys 6 caràcters." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SHEETDB_USERS_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts?sheet=usuaris';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);

    try {
      // Primer comprovem si l'usuari ja existeix
      const checkRes = await fetch(SHEETDB_USERS_URL);
      const users = await checkRes.json();
      const existingUser = users.find((u: any) => u.usuari.toLowerCase() === data.email.toLowerCase());

      if (existingUser) {
        setError("Aquest correu ja està registrat.");
        setLoading(false);
        return;
      }

      // Creem el nou usuari a SheetDB
      const response = await fetch(SHEETDB_USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            {
              usuari: data.email,
              password: data.password,
              nom: data.fullName,
              rol: 'client',
              empresa: 'Client Particular',
              fiscalid: '-',
              adreca: '-',
              telefon: '-'
            }
          ]
        }),
      });

      if (response.ok) {
        localStorage.setItem('userName', data.email);
        localStorage.setItem('userRole', 'client');
        localStorage.setItem('userFullName', data.fullName);
        
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error("Error en el registre");
      }
    } catch (err) {
      setError("S'ha produït un error en crear el compte. Intenta-ho més tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-4 py-20">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Crea un Compte</CardTitle>
          <CardDescription>
            Introdueix la teva informació per registrar-te a Global Cargo Care.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nom Complet</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...form.register("fullName")}
                disabled={loading}
              />
              {form.formState.errors.fullName && (
                <p className="text-xs font-medium text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>
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
                <AlertTitle>Error de registre</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Crea el Compte"
              )}
            </Button>
          </form>
        </CardContent>
        <div className="mb-6 mt-2 text-center text-sm">
          Ja tens un compte?{" "}
          <Link href="/login" className="underline font-semibold text-primary">
            Inicia la sessió
          </Link>
        </div>
      </Card>
    </div>
  );
}
