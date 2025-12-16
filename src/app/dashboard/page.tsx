'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Building, LogOut } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Aquesta funció s'executarà només al client
    const name = localStorage.getItem("userName");

    if (name) {
      setUserName(name);
    } else {
      // Si no hi ha dades, fem fora l'usuari cap a /login
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    router.push("/login");
    router.refresh(); // Força l'actualització de la barra de navegació
  };
  
  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <div className="space-y-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-6">
             <Skeleton className="h-8 w-2/3" />
          </CardContent>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!userName) {
    // Aquesta comprovació evita un flaix de contingut mentre es redirigeix
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Benvingut a la teva zona privada, {userName}</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Sortir
        </Button>
      </div>
      <Separator className="my-8" />
       <Card>
        <CardHeader>
          <CardTitle>El teu Perfil</CardTitle>
           <CardDescription>
            Aquí pots gestionar la teva informació.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Properament podràs veure aquí els teus enviaments i dades...</p>
        </CardContent>
      </Card>
    </div>
  );
}
