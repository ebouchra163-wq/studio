'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  PlusCircle, 
  History, 
  Package, 
  MapPin,
  RefreshCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// URL de SheetDB apuntant a la pestanya 'solicituds'
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts?sheet=solicituds';

const bookingSchema = z.object({
  servei: z.string().min(1, { message: "El tipus de servei és requerit." }),
  origen: z.string().min(1, { message: "L'origen és requerit." }),
  desti: z.string().min(1, { message: "El destí és requerit." }),
  carrega: z.string().min(5, { message: "Descriu la càrrega amb una mica més de detall (mínim 5 caràcters)." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingRecord {
  id: string;
  data: string;
  usuari: string;
  estat: string;
  detalls: string;
  isLocal?: boolean;
}

export default function BookingPage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const fetchBookings = useCallback(async (userName: string) => {
    if (!userName) return;
    setLoading(true);
    
    try {
      const response = await fetch(SHEETDB_API_URL);
      const apiData = response.ok ? await response.json() : [];

      // Carreguem les reserves locals (fallback de seguretat)
      const localDataRaw = localStorage.getItem(`local_bookings_${userName.trim().toLowerCase()}`);
      const localData: BookingRecord[] = localDataRaw ? JSON.parse(localDataRaw) : [];

      // Filtrem les dades de l'API per l'usuari actual (insensible a majúscules i amb trim)
      const userClean = userName.trim().toLowerCase();
      const filteredApiData = Array.isArray(apiData) 
        ? apiData.filter((b: any) => b.usuari && b.usuari.trim().toLowerCase() === userClean)
        : [];

      // Combinem i ordenem per data
      const combined = [...localData, ...filteredApiData].sort((a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });

      // Eliminem duplicats si la local s'ha sincronitzat amb l'API
      const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

      setBookings(unique);
    } catch (err: any) {
      console.error("Error carregant reserves:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (!storedUser) {
      router.push('/login');
    } else {
      setCurrentUser(storedUser);
      fetchBookings(storedUser);
    }
  }, [router, fetchBookings]);

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      servei: "",
      origen: "",
      desti: "",
      carrega: "",
    }
  });

  const onSubmit = async (formData: BookingFormValues) => {
    if (!currentUser) return;
    
    setSubmitting(true);
    const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];
    const detallsConcatenats = `${formData.servei} | Origen: ${formData.origen} -> Destí: ${formData.desti} | Càrrega: ${formData.carrega}`;

    const newBooking: BookingRecord = {
      id: bookingId,
      data: today,
      usuari: currentUser,
      estat: 'Pendent',
      detalls: detallsConcatenats
    };

    try {
      const response = await fetch(SHEETDB_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ data: [newBooking] }),
      });

      if (response.ok) {
        toast({
          title: "Sol·licitud enviada!",
          description: `La reserva ${bookingId} s'ha registrat correctament.`,
        });
        reset();
        await fetchBookings(currentUser);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "No s'ha pogut escriure a l'Excel.";
        
        // Fallback local si l'API falla per permisos (403)
        saveLocally(newBooking, currentUser);
        toast({
          variant: "destructive",
          title: "Desada localment",
          description: response.status === 403 
            ? "L'Excel està en mode lectura, però hem guardat la teva sol·licitud aquí." 
            : errorMessage,
        });
        reset();
        await fetchBookings(currentUser);
      }
    } catch (err: any) {
      console.error("Error enviant reserva:", err);
      saveLocally(newBooking, currentUser);
      toast({
        variant: "destructive",
        title: "Connexió fallida",
        description: "Hem guardat la teva sol·licitud al teu navegador per seguretat.",
      });
      reset();
      await fetchBookings(currentUser);
    } finally {
      setSubmitting(false);
    }
  };

  const saveLocally = (booking: BookingRecord, userName: string) => {
    const key = `local_bookings_${userName.trim().toLowerCase()}`;
    const localDataRaw = localStorage.getItem(key);
    const localData: BookingRecord[] = localDataRaw ? JSON.parse(localDataRaw) : [];
    localData.push({ ...booking, isLocal: true });
    localStorage.setItem(key, JSON.stringify(localData));
  };

  const getStatusBadge = (status: string, isLocal?: boolean) => {
    if (isLocal) return <Badge variant="secondary" className="bg-slate-200 text-slate-700">Pendent (Local)</Badge>;
    
    const s = (status || 'Pendent').trim().toLowerCase();
    
    // Verificació d'estat pendent
    if (s.includes('pendent') || s === 'pending') {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm">Pendent</Badge>;
    }
    
    // Verificació d'estat aprovat/acceptat (EN VERD)
    // Fem la verificació més robusta per a variants com "Aceptada", "Acceptada", "Aprobado", etc.
    if (
      s.includes('aprov') || 
      s.includes('acept') || 
      s.includes('accept') || 
      s === 'approved' || 
      s === 'ok' ||
      s === 'lliurat'
    ) {
      return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm">{status}</Badge>;
    }
    
    // Verificació d'estat rebutjat
    if (s.includes('rebutjat') || s.includes('rechazada') || s === 'rejected' || s === 'rebutjada' || s.includes('cancel')) {
      return <Badge variant="destructive" className="shadow-sm">{status}</Badge>;
    }
    
    return <Badge variant="outline" className="shadow-sm">{status}</Badge>;
  };

  if (!currentUser && loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-blue-900">Gestió de Reserves</h1>
        <p className="text-muted-foreground">Sol·licita nous transports i gestiona les teves comandes actives.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-primary">
                <PlusCircle className="h-5 w-5" /> Nova Sol·licitud
              </CardTitle>
              <CardDescription>Detalls de la mercaderia a transportar.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="servei">Tipus de Servei</Label>
                  <Controller
                    name="servei"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servei" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Transport Marítim">Transport Marítim</SelectItem>
                          <SelectItem value="Transport Aeri">Transport Aeri</SelectItem>
                          <SelectItem value="Transport Terrestre">Transport Terrestre</SelectItem>
                          <SelectItem value="Emmagatzematge">Emmagatzematge</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.servei && <p className="text-xs text-destructive">{errors.servei.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origen">Origen</Label>
                    <Input id="origen" placeholder="Ex: Barcelona" {...register('origen')} />
                    {errors.origen && <p className="text-xs text-destructive">{errors.origen.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desti">Destí</Label>
                    <Input id="desti" placeholder="Ex: Nova York" {...register('desti')} />
                    {errors.desti && <p className="text-xs text-destructive">{errors.desti.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrega">Descripció de la Càrrega</Label>
                  <Textarea 
                    id="carrega" 
                    placeholder="Pes, volum, dimensions, bultos..." 
                    className="min-h-[100px]"
                    {...register('carrega')}
                  />
                  {errors.carrega && <p className="text-xs text-destructive">{errors.carrega.message}</p>}
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviant...</>
                  ) : (
                    "Enviar Sol·licitud"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Les meves sol·licituds</h2>
            </div>
            {currentUser && (
              <Button variant="ghost" size="sm" onClick={() => fetchBookings(currentUser)} disabled={loading}>
                <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
              </Button>
            )}
          </div>
          <Separator className="mb-6" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground animate-pulse">Sincronitzant amb l'Excel...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="border-dashed py-20 text-center bg-muted/20">
              <CardContent>
                <Package className="mx-auto h-16 w-16 text-muted-foreground/20" />
                <p className="mt-6 text-xl font-medium text-muted-foreground">No tens cap sol·licitud activa.</p>
                <p className="text-sm text-muted-foreground mt-2">Les teves noves reserves apareixeran aquí mateix.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className={cn("transition-all hover:shadow-md border-l-4", booking.isLocal ? "border-l-slate-400" : "border-l-primary")}>
                  <CardHeader className="pb-3 flex flex-row items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">{booking.id}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{booking.data}</span>
                      </div>
                      <CardTitle className="text-base font-semibold pt-1">
                         {booking.detalls.split('|')[0].trim()}
                      </CardTitle>
                    </div>
                    {getStatusBadge(booking.estat, booking.isLocal)}
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="rounded-lg bg-muted/40 p-3 border border-muted text-sm leading-relaxed whitespace-pre-line text-slate-700">
                      {booking.detalls.includes('|') ? booking.detalls.split('|').slice(1).join(' | ').trim() : booking.detalls}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center justify-between">
                     <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Global Cargo Care
                     </div>
                     {booking.isLocal && <span className="text-amber-600 font-bold italic text-[10px] uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Desada localment</span>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
