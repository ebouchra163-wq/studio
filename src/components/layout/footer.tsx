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
              Your trusted partner for global transport and logistics solutions.
            </p>
          </div>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Quick Links</h3>
              <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <Link href="/tracking" className="text-muted-foreground hover:text-primary">Track Shipment</Link>
              <Link href="/optimize" className="text-muted-foreground hover:text-primary">Optimize Route</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
             <h3 className="font-semibold">Contact Us</h3>
             <p className="text-muted-foreground">123 Logistics Lane, Port City</p>
             <p className="text-muted-foreground">contact@globalcargo.care</p>
             <p className="text-muted-foreground">+1 (234) 567-8900</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Global Cargo Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
