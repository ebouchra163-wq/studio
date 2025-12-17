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
  Info,
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

type ShippingStatus = 'En almacen' | 'En transito' | 'Entregado' | 'lliurat';

interface ShipmentData {
  tracking_code: string;
  origin: string;
  destination: string;
  eta: string;
  location: string;
  status: ShippingStatus;
}

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts';

const statusConfig: {
  [key in ShippingStatus]: {
    progress: number;
    color: string;
    icon: React.ElementType;
    text: string;
  };
} = {
  'En almacen': {
    progress: 10,
    color: 'bg-gray-400',
    icon: WarehouseIcon,
    text: 'En origen',
  },
  'En transito': {
    progress: 50,
    color: 'bg-blue-500',
    icon: Truck,
    text: 'En reparto',
  },
  'Entregado': {
    progress: 100,
    color: 'bg-green-500',
    icon: PackageCheck,
    text: 'Entregado',
  },
  'lliurat': {
    progress: 100,
    color: 'bg-green-500',
    icon: PackageCheck,
    text: 'Entregado',
  },
};

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Por favor, introduce un código de seguimiento.');
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
        setError('Código no encontrado. Revisa el código y vuelve a intentarlo.');
      }
    } catch (err: any) {
      setError('Ha habido un problema con la conexión. Inténtalo más tarde.');
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
          Localiza tu envío
        </h1>
        <p className="text-muted-foreground">
          Introduce tu código de seguimiento para ver el estado en tiempo real.
        </p>
      </div>
      <Separator className="my-8" />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex w-full flex-col items-end gap-4 sm:flex-row">
            <div className="w-full flex-1">
              <Label htmlFor="tracking-code" className="font-semibold">Código de Seguimiento</Label>
              <Input
                id="tracking-code"
                type="text"
                placeholder="Ej: TRK12345678"
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
              <span className="ml-2">Buscar</span>
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

      {!isLoading && shipmentData && currentStatus && (
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <CheckCircle className="text-green-500" />
              <span>Resultados para: {shipmentData.tracking_code}</span>
            </CardTitle>
            <CardDescription>
              A continuación se muestran los detalles de tu envío.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold">Progreso del envío</h3>
              {currentStatus && (
                <>
                  <Progress
                    value={currentStatus.progress}
                    indicatorClassName={currentStatus.color}
                  />
                  <div className="mt-3 grid grid-cols-3 text-center text-sm font-medium text-muted-foreground">
                    <div className={cn(shipmentData.status === 'En almacen' && 'font-bold text-primary')}>En origen</div>
                    <div className={cn(shipmentData.status === 'En transito' && 'font-bold text-primary')}>En tránsito</div>
                    <div className={cn((shipmentData.status === 'Entregado' || shipmentData.status === 'lliurat') && 'font-bold text-primary')}>Entregado</div>
                  </div>
                </>
              )}
            </div>

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
                    <h4 className="font-semibold">Destino</h4>
                    <p className="text-muted-foreground">{shipmentData.destination}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Fecha prevista (ETA)</h4>
                    <p className="text-muted-foreground">{shipmentData.eta}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Estado</h4>
                    <p className="text-muted-foreground">{shipmentData.status}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <currentStatus.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold">Ubicación actual</h4>
                    <p className="text-muted-foreground">{shipmentData.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
