
'use client';

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
import { LogOut, User, UserCircle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsView from '@/components/documents-view';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
    router.refresh();
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
  
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Benvingut/da, {user.displayName || user.email}</h1>
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
                    <h3 className='font-semibold text-lg'>{user.displayName || 'Client'}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
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
