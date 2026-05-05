
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, MessageCircle, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const complaintSchema = z.object({
  name: z.string().min(2, { message: "El nom és massa curt." }),
  email: z.string().email({ message: "Introdueix un correu vàlid." }),
  subject: z.string().min(5, { message: "L'assumpte ha de ser més descriptiu." }),
  message: z.string().min(10, { message: "Si us plau, detalla una mica més la teva queixa." }),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

export default function ComplaintsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
  });

  const onSubmit = async (data: ComplaintFormValues) => {
    setIsSubmitting(true);
    // Simulem l'enviament (aquí es podria connectar amb una API o SheetDB)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
      title: "Queixa rebuda",
      description: "Hem registrat la teva reclamació. Ens posarem en contacte amb tu aviat.",
    });
    reset();
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-primary mb-4">
          Atenció al Client
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          La teva satisfacció és la nostra prioritat. Si has tingut algun problema amb el nostre servei, si us plau, explica'ns-ho.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-primary/5 border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle className="h-5 w-5" /> Compromís
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Ens comprometem a revisar cada queixa en un termini màxim de 48 hores laborables.
            </CardContent>
          </Card>
          
          <div className="space-y-4 px-2">
            <h3 className="font-bold text-lg">Altres vies de contacte</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="bg-accent/10 p-2 rounded-full text-accent">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span>Xat en viu (properament)</span>
            </div>
          </div>
        </div>

        <Card className="md:col-span-2 border-none shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold">Formulari de Reclamació</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Detalla el teu cas i adjunta tota la informació rellevant.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input 
                    id="name" 
                    placeholder="El teu nom" 
                    {...register('name')} 
                    className="bg-slate-50 border-none h-12"
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correu Electrònic</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="exemple@correu.com" 
                    {...register('email')} 
                    className="bg-slate-50 border-none h-12"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assumpte</Label>
                <Input 
                  id="subject" 
                  placeholder="Ex: Retard en l'entrega de la comanda TRK..." 
                  {...register('subject')} 
                  className="bg-slate-50 border-none h-12"
                />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Missatge i Detalls</Label>
                <Textarea 
                  id="message" 
                  placeholder="Explica'ns què ha passat amb el màxim detall possible..." 
                  className="min-h-[150px] bg-slate-50 border-none text-base"
                  {...register('message')}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviat...</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" /> Envia la Queixa</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
