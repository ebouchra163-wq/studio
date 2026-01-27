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
import { LogOut, User, Shield, Briefcase } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Aquesta funció s'executarà només al client
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");

    if (name && role) {
      setUserName(name);
      setUserRole(role.trim().toLowerCase());
    } else {
      // Si no hi ha dades, fem fora l'usuari cap a /login
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    router.push("/login");
    router.refresh(); // Força l'actualització de la barra de navegació
  };
  
  const renderRoleContent = () => {
    switch (userRole) {
      case 'administrador':
        return (
          <CardContent>
            <div className='flex items-center gap-2 mb-4'>
                <Shield className='h-5 w-5 text-primary'/>
                <h3 className='font-semibold'>Panell d'administrador</h3>
            </div>
            <p className="text-muted-foreground">Aquí tens accés a totes les opcions de gestió del sistema.</p>
          </CardContent>
        );
      case 'treballador':
        return (
          <CardContent>
            <div className='flex items-center gap-2 mb-4'>
                <Briefcase className='h-5 w-5 text-primary'/>
                <h3 className='font-semibold'>Panell de treballador</h3>
            </div>
            <p className="text-muted-foreground">Aquí pots veure les teves tasques i enviaments assignats.</p>
          </CardContent>
        );
      default:
        return (
            <CardContent>
                <p className="text-destructive font-semibold">Rol no reconegut.</p>
            </CardContent>
        );
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Benvingut/da, {userName}</h1>
            <p className="text-muted-foreground">Aquesta és la teva àrea privada.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Tanca la sessió
        </Button>
      </div>
      <Separator className="my-8" />
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5"/> El teu perfil
          </CardTitle>
           <CardDescription>
            Rol: <span className='font-medium text-primary'>{userRole}</span>
          </CardDescription>
        </CardHeader>
        {renderRoleContent()}
      </Card>
    </div>
  );
}
