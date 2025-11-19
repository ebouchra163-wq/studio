import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Su socio de confianza para soluciones globales de transporte y logística.
            </p>
          </div>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Enlaces Rápidos</h3>
              <Link href="/" className="text-muted-foreground hover:text-primary">Inicio</Link>
              <Link href="/tracking" className="text-muted-foreground hover:text-primary">Rastrear Envío</Link>
              <Link href="/optimize" className="text-muted-foreground hover:text-primary">Optimizar Ruta</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary">Contacto</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
             <h3 className="font-semibold">Contáctanos</h3>
             <p className="text-muted-foreground">123 Calle de la Logística, Ciudad Portuaria</p>
             <p className="text-muted-foreground">contact@globalcargo.care</p>
             <p className="text-muted-foreground">+1 (234) 567-8900</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Global Cargo Care. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
