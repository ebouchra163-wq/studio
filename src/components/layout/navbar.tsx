
"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { LogIn, Menu, PackageSearch, Home, Newspaper, Users, User, CalendarDays, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

const mainNavLinks = [
  { href: "/", label: "Inici", icon: Home },
  { href: "/about", label: "Sobre Nosaltres", icon: Users },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/tracking", label: "Seguiment", icon: PackageSearch },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const auth = useAuth();
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
    router.refresh();
  };

  if (isMobile === undefined || loading) {
    return null;
  }
  
  const authLinks = (
    <>
      {user ? (
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-4 w-4" /> Reserves
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" /> Perfil
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Surt
            </Button>
        </div>
      ) : (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link href="/signup">Registra't</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Entra
            </Link>
          </Button>
        </>
      )}
    </>
  );

  const mobileAuthLinks = (
    <>
      {user ? (
        <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-4 w-4" /> Reserves
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" /> Perfil
              </Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Tanca la sessió
            </Button>
        </div>
      ) : (
        <>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/signup">Registra't</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Inicia la Sessió
            </Link>
          </Button>
        </>
      )}
    </>
  )


  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/">
            <Logo className="h-14 transform scale-[1.8]" />
            <span className="sr-only">Inici</span>
          </Link>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Obre el menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col gap-6 p-4">
                <Logo className="h-20" />
                <nav className="flex flex-col gap-4">
                  {mainNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md p-2 text-lg font-medium",
                        pathname === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/80"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  {mobileAuthLinks}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-8">
          <Logo className="h-20 transform scale-[2.2]" />
          <span className="sr-only">Inici</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {authLinks}
        </div>
      </div>
    </header>
  );
}
