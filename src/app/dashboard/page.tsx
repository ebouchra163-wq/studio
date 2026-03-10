
'use client';

import { useState, useEffect } from 'react';
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
import { LogOut, User, UserCircle, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsView from '@/components/documents-view';

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; fullName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userFullName = localStorage.getItem('userFullName');
    
    if (!userName) {
      router.push('/login');
    } else {
      setCurrentUser({
        name: userName,
        fullName: userFullName || 'Client'
      });
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userFullName');
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!currentUser) return null;

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Benvingut/da, {currentUser.fullName}</h1>
            <p className="text-muted-foreground">Aquesta és la teva àrea privada de Global Cargo Care.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Tanca la sessió
        </Button>
      </div>
      <Separator className="my-8" />
       
      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="perfil">El teu Perfil</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="perfil">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5"/> Informació Personal
              </CardTitle>
              <CardDescription>
                Dades associades al teu compte de client.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4 mb-4'>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <UserCircle className='h-8 w-8 text-primary'/>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg'>{currentUser.fullName}</h3>
                    <p className="text-muted-foreground">{currentUser.name}</p>
                  </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Des del teu perfil pots veure les teves reserves i consultar les teves factures a la pestanya de documents.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
            <DocumentsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
