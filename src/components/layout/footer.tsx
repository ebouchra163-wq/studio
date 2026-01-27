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
              El vostre soci de confiança per a solucions globals d'enviament i logística.
            </p>
          </div>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Enllaços Ràpids</h3>
              <Link href="/" className="text-muted-foreground hover:text-primary">Inici</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary">Sobre Nosaltres</Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              <Link href="/tracking" className="text-muted-foreground hover:text-primary">Seguiment d'Enviament</Link>
              <Link href="/optimize" className="text-muted-foreground hover:text-primary">Optimitzar Ruta</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary">Contacte</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-muted-foreground hover:text-primary">Política de Privadesa</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">Termes de Servei</Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
             <h3 className="font-semibold">Contacta'ns</h3>
             <p className="text-muted-foreground">123 Logistics Lane, Port City</p>
             <p className="text-muted-foreground">contact@globalcargo.care</p>
             <p className="text-muted-foreground">+1 (234) 567-8900</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2024 Global Cargo Care. Tots els drets reservats.
        </div>
      </div>
    </footer>
  );
}
