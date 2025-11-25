import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Inici de Sessió de Client</CardTitle>
          <CardDescription>
            Introduïu el vostre correu electrònic a continuació per iniciar sessió al vostre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correu Electrònic</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contrasenya</Label>
            <Input id="password" type="password" required />
          </div>
          <Button asChild className="w-full">
            <Link href="/account">
                <LogIn className="mr-2 h-4 w-4"/> Iniciar Sessió
            </Link>
          </Button>
        </CardContent>
        <div className="mb-4 mt-2 text-center text-sm">
          No tens un compte?{" "}
          <Link href="/signup" className="underline">
            Registra't
          </Link>
        </div>
      </Card>
    </div>
  );
}
