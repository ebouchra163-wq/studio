'use client';

import { useState, useEffect } from 'react';
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
  Ship, 
  Plane, 
  Truck, 
  Warehouse 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts?sheet=solicituds';

const bookingSchema = z.object({
  servei: z.string().min(1, { message: "El tipus de servei és requerit." }),
  origen: z.string().min(1, { message: "L'origen és requerit." }),
  desti: z.string().min(1, { message: "El destí és requerit." }),
  carrega: z.string().min(5, { message: "Descriu la càrrega amb una mica més de detall (mínim 5 caràcters)." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingRequest {
  id: string;
  data: string;
  usuari: string;
  estat: string;
  detalls: string;
}

export default function BookingPage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      servei: "",
      origen: "",
      desti: "",
      carrega: "",
    }
  });

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(user);
      setAuthChecking(false);
      fetchBookings(user);
    }
  }, [router]);

  const fetchBookings = async (user: string) => {
    try {
      setLoading(true);
      setFetchError(false);
      const response = await fetch(SHEETDB_API_URL);
      
      if (!response.ok) {
        setFetchError(true);
        setBookings([]);
        return;
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const userBookings = data.filter((b: BookingRequest) => b.usuari === user);
        setBookings(userBookings.sort((a: BookingRequest, b: BookingRequest) => (b.data || '').localeCompare(a.data || '')));
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.warn("SheetDB Fetch error:", error);
      setFetchError(true);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    if (!currentUser) return;
    
    setSubmitting(true);
    const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];
    
    const detallsConcatenats = `Servei: ${data.servei} | Origen: ${data.origen} | Destí: ${data.desti} | Càrrega: ${data.carrega}`;

    const newBooking = {
      id: bookingId,
      data: today,
      usuari: currentUser,
      estat: 'Pendent',
      detalls: detallsConcatenats
    };

    try {
      const response = await fetch(SHEETDB_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [newBooking] })
      });

      if (response.ok) {
        toast({
          title: "Sol·licitud enviada!",
          description: `La teva reserva ${bookingId} s'ha registrat correctament.`,
        });
        reset();
        fetchBookings(currentUser);
      } else {
        throw new Error("Error en l'enviament.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No s'ha pogut enviar la sol·licitud. Intenta-ho més tard.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status || 'Pendent';
    switch (s.toLowerCase()) {
      case 'pendent':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pendent</Badge>;
      case 'aprovat':
        return <Badge className="bg-green-600 hover:bg-green-700">Aprovat</Badge>;
      default:
        return <Badge variant="outline">{s}</Badge>;
    }
  };

  if (authChecking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Gestió de Reserves</h1>
        <p className="text-muted-foreground">Sol·licita nous transports i gestiona les teves comandes actives.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" /> Nova Sol·licitud
              </CardTitle>
              <CardDescription>Omple els detalls del transport que necessites.</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <Input id="origen" placeholder="Ex: BCN" {...register('origen')} />
                    {errors.origen && <p className="text-xs text-destructive">{errors.origen.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desti">Destí</Label>
                    <Input id="desti" placeholder="Ex: NYC" {...register('desti')} />
                    {errors.desti && <p className="text-xs text-destructive">{errors.desti.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrega">Descripció de la Càrrega</Label>
                  <Textarea 
                    id="carrega" 
                    placeholder="Pes, dimensions, quantitat de bultos..." 
                    className="min-h-[100px]"
                    {...register('carrega')}
                  />
                  {errors.carrega && <p className="text-xs text-destructive">{errors.carrega.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviant...</>
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
              <History className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Les meves sol·licituds</h2>
            </div>
            {currentUser && (
              <Button variant="ghost" size="sm" onClick={() => fetchBookings(currentUser)} disabled={loading}>
                Actualitzar
              </Button>
            )}
          </div>
          <Separator className="mb-6" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">Carregant l'històric...</p>
            </div>
          ) : fetchError ? (
            <Card className="border-dashed py-12 text-center border-destructive/50">
              <CardContent>
                <Package className="mx-auto h-12 w-12 text-destructive/50" />
                <p className="mt-4 text-lg font-medium text-destructive">No s'ha pogut carregar l'històric.</p>
                <p className="text-sm text-muted-foreground">Pot haver-hi un problema de connexió amb el servidor.</p>
                <Button variant="outline" className="mt-4" onClick={() => currentUser && fetchBookings(currentUser)}>
                  Torna-ho a intentar
                </Button>
              </CardContent>
            </Card>
          ) : bookings.length === 0 ? (
            <Card className="border-dashed py-12 text-center">
              <CardContent>
                <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No tens cap sol·licitud activa.</p>
                <p className="text-sm text-muted-foreground">Fes servir el formulari per crear la teva primera reserva.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">{booking.id}</span>
                        <span className="text-xs text-muted-foreground">• {booking.data}</span>
                      </div>
                      {getStatusBadge(booking.estat)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-sm leading-relaxed">{booking.detalls}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center gap-4">
                     <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Logística Global
                     </div>
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
