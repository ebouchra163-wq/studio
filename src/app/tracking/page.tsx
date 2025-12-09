'use client';

import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  PackageSearch,
  MapPin,
  Calendar,
  Warehouse as WarehouseIcon,
  Truck,
  PackageCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ShippingStatus = 'En magatzem' | 'En trànsit' | 'Lliurat';

interface ShipmentData {
  tracking_code: string;
  origin: string;
  destination: string;
  eta: string;
  current_location: string;
  status: ShippingStatus;
}

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/7wm9ojrecm2pq';

const statusConfig: {
  [key in ShippingStatus]: {
    progress: number;
    color: string;
    icon: React.ElementType;
    text: string;
  };
} = {
  'En magatzem': {
    progress: 10,
    color: 'bg-gray-400',
    icon: WarehouseIcon,
    text: 'A l\'origen',
  },
  'En trànsit': {
    progress: 50,
    color: 'bg-blue-500',
    icon: Truck,
    text: 'En repartiment',
  },
  'Lliurat': {
    progress: 100,
    color: 'bg-green-500',
    icon: PackageCheck,
    text: 'Lliurat',
  },
};

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipmentData(null);

    try {
      const response = await fetch(
        `${SHEETDB_API_URL}/search?tracking_code=${trackingCode}`
      );
      
      const data: ShipmentData[] = await response.json();

      if (response.ok && data.length > 0) {
        setShipmentData(data[0]);
      } else {
        setError('Codi no trobat. Revisa el codi i torna a intentar-ho.');
      }
    } catch (err: any) {
      setError('Hi ha hagut un problema amb la connexió. Intenta-ho més tard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const currentStatus = shipmentData ? statusConfig[shipmentData.status] : null;

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Localitza el teu enviament
        </h1>
        <p className="text-muted-foreground">
          Introdueix el teu codi de seguiment per veure l'estat en temps real.
        </p>
      </div>
      <Separator className="my-8" />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex w-full flex-col items-end gap-4 sm:flex-row">
            <div className="w-full flex-1">
              <Label htmlFor="tracking-code" className="font-semibold">Codi de Seguiment</Label>
              <Input
                id="tracking-code"
                type="text"
                placeholder="Ex: TRK12345678"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="mt-2 text-base"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PackageSearch />
              )}
              <span className="ml-2">Cercar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center p-8">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {shipmentData && !isLoading && (
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <CheckCircle className="text-green-500" />
              <span>Resultats per: {shipmentData.tracking_code}</span>
            </CardTitle>
            <CardDescription>
              A continuació es mostren els detalls del teu enviament.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {currentStatus && (
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold">Estat de l'enviament</h3>
                <div className="relative h-2 w-full rounded-full bg-muted">
                   <div
                    className={cn(
                      'absolute h-2 rounded-full transition-all duration-500',
                      currentStatus.color
                    )}
                    style={{ width: `${currentStatus.progress}%` }}
                  />
                </div>
                 <div className="mt-3 grid grid-cols-3 text-center text-sm font-medium text-muted-foreground">
                  <div className={cn(shipmentData.status === 'En magatzem' && 'font-bold text-primary')}>A l'origen</div>
                  <div className={cn(shipmentData.status === 'En trànsit' && 'font-bold text-primary')}>En trànsit</div>
                  <div className={cn(shipmentData.status === 'Lliurat' && 'font-bold text-primary')}>Lliurat</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Origen</h4>
                    <p className="text-muted-foreground">{shipmentData.origin}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <PackageSearch className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Destí</h4>
                    <p className="text-muted-foreground">{shipmentData.destination}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Data prevista (ETA)</h4>
                    <p className="text-muted-foreground">{shipmentData.eta}</p>
                  </div>
                </div>
                {currentStatus && (
                   <div className="flex items-start gap-3">
                    <currentStatus.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="font-semibold">Ubicació actual</h4>
                      <p className="text-muted-foreground">{shipmentData.current_location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
