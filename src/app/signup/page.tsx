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
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crear un Compte</CardTitle>
          <CardDescription>
            Introduïu la vostra informació per crear un nou compte de client.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Nom Complert</Label>
            <Input id="full-name" placeholder="Joan Petit" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correu Electrònic</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contrasenya</Label>
            <Input id="password" type="password" required />
          </div>
          <Button asChild className="w-full">
            <Link href="/account">Crear Compte</Link>
          </Button>
        </CardContent>
        <div className="mb-4 mt-2 text-center text-sm">
          Ja tens un compte?{" "}
          <Link href="/login" className="underline">
            Iniciar Sessió
          </Link>
        </div>
      </Card>
    </div>
  );
}
