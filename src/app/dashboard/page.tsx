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
  const [userCompany, setUserCompany] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Aquesta funció s'executarà només al client
    const name = localStorage.getItem("userName");
    const company = localStorage.getItem("userCompany");

    if (name && company) {
      setUserName(name);
      setUserCompany(company);
    } else {
      // Si no hi ha dades, potser l'usuari no ha iniciat sessió
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userCompany");
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
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">El Teu Perfil</h1>
            <p className="text-muted-foreground">
              Aquí pots veure la teva informació d'usuari.
            </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Tancar Sessió
        </Button>
      </div>
      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Informació del teu Compte</CardTitle>
          <CardDescription>
            Aquestes són les dades associades al teu usuari.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Nom d'Usuari</h3>
              <p className="text-muted-foreground">{userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Building className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Empresa</h3>
              <p className="text-muted-foreground">{userCompany}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
