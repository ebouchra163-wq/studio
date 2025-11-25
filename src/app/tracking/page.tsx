"use client";

import { AlertCircle, Loader2, PackageSearch, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const MOCK_TRACKING_ID = "GCC-12345";
const trackingMapImage = PlaceHolderImages.find(
  (img) => img.id === "tracking-map"
);

type TrackingStatus =
  | "idle"
  | "loading"
  | "found"
  | "not_found"
  | "error";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState<TrackingStatus>("idle");

  const handleTrack = () => {
    setStatus("loading");
    setTimeout(() => {
      if (trackingId.toUpperCase() === MOCK_TRACKING_ID) {
        setStatus("found");
      } else {
        setStatus("not_found");
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rastregeu el vostre Enviament</h1>
        <p className="text-muted-foreground">
          Introduïu el vostre ID de seguiment per obtenir actualitzacions en temps real del vostre enviament.
        </p>
      </div>
      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Introduïu l'ID de Seguiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="tracking-id">ID de Seguiment</Label>
              <Input
                id="tracking-id"
                placeholder={MOCK_TRACKING_ID}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <Button onClick={handleTrack} disabled={status === "loading"}>
              {status === "loading" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PackageSearch className="mr-2 h-4 w-4" />
              )}
              Rastrejar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        {status === "loading" && (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {status === "not_found" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Trobat</AlertTitle>
            <AlertDescription>
              No s'ha trobat cap enviament per a l'ID de seguiment &quot;{trackingId}&quot;. Si us plau,
              verifiqueu l'ID i torneu-ho a provar.
            </AlertDescription>
          </Alert>
        )}

        {status === "found" && (
          <Card>
            <CardHeader>
              <CardTitle>Estat de l'Enviament per a {MOCK_TRACKING_ID}</CardTitle>
              <CardDescription>
                El vostre paquet està en camí!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                 <CheckCircle className="h-6 w-6 text-green-600" />
                 <p className="text-lg font-medium">En Trànsit</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">Origen:</span> Nova York, NY</li>
                <li><span className="font-semibold text-foreground">Destinació:</span> Los Angeles, CA</li>
                <li><span className="font-semibold text-foreground">Entrega Estimada:</span> 5 d'agost de 2024</li>
                <li><span className="font-semibold text-foreground">Última Actualització:</span> En ruta cap al centre de classificació a Chicago, IL.</li>
              </ul>
              {trackingMapImage && (
                <div className="overflow-hidden rounded-lg border">
                  <Image
                    src={trackingMapImage.imageUrl}
                    alt={trackingMapImage.description}
                    width={1200}
                    height={800}
                    className="aspect-video w-full object-cover"
                    data-ai-hint={trackingMapImage.imageHint}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Això és una simulació. Per a un seguiment real, si us plau contacteu amb suport al client.</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
