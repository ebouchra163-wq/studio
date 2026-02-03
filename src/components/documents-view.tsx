'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Printer, FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';

// --- Tipus de Dades ---
interface InvoiceLine {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
}

interface UserData {
  usuari: string;
  nom: string;
  empresa: string;
  rol: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
  password?: string;
}

interface GroupedInvoice {
  invoiceNumber: string;
  date: string;
  paymentMethod: string;
  client: UserData;
  ourCompany: UserData;
  lines: InvoiceLine[];
  subtotal: number;
  vatBreakdown: { rate: number; base: number; amount: number }[];
  total: number;
}

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/n5eliliog16ts';

export default function DocumentsView() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (!userName || !userRole) {
      router.push('/login');
    } else {
      setCurrentUser({ name: userName, role: userRole.trim().toLowerCase() });
    }
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [docsRes, usersRes] = await Promise.all([
          fetch(`${SHEETDB_API_URL}?sheet=documents`),
          fetch(`${SHEETDB_API_URL}?sheet=usuaris`),
        ]);

        if (!docsRes.ok || !usersRes.ok) {
          throw new Error("No s'han pogut carregar les dades de les factures o usuaris.");
        }

        const allDocs: InvoiceLine[] = await docsRes.json();
        const allUsers: UserData[] = await usersRes.json();

        const ourCompanyData = allUsers.find(
          (u) => u.rol.toLowerCase() === 'administrador' || u.rol.toLowerCase() === 'treballador'
        ) || allUsers[0];

        // Filtrar factures segons el rol
        const allowedDocs =
          currentUser.role === 'administrador' || currentUser.role === 'treballador'
            ? allDocs
            : allDocs.filter((doc) => doc.usuari === currentUser.name);

        // Agrupar línies de factura per num_factura
        const grouped = allowedDocs.reduce((acc, line) => {
          const num = line.num_factura;
          if (!acc[num]) {
            acc[num] = [];
          }
          acc[num].push(line);
          return acc;
        }, {} as Record<string, InvoiceLine[]>);

        const processedInvoices: GroupedInvoice[] = Object.entries(grouped).map(
          ([invoiceNumber, lines]) => {
            const clientData =
              allUsers.find((u) => u.usuari === lines[0].usuari) || ({} as UserData);

            let subtotal = 0;
            const vatBreakdown: Record<string, { base: number; amount: number }> = {};

            lines.forEach((line) => {
              const price = parseFloat(line.preu_unitari) || 0;
              const units = parseFloat(line.unitats) || 0;
              const discount = parseFloat(line.dte) || 0;
              const ivaRate = parseFloat(line.iva) || 0;

              const lineTotal = price * units * (1 - discount / 100);
              subtotal += lineTotal;

              const vatAmount = lineTotal * (ivaRate / 100);

              if (!vatBreakdown[ivaRate]) {
                vatBreakdown[ivaRate] = { base: 0, amount: 0 };
              }
              vatBreakdown[ivaRate].base += lineTotal;
              vatBreakdown[ivaRate].amount += vatAmount;
            });

            const totalVat = Object.values(vatBreakdown).reduce((acc, curr) => acc + curr.amount, 0);
            const total = subtotal + totalVat;

            return {
              invoiceNumber,
              lines,
              client: clientData,
              ourCompany: ourCompanyData,
              date: lines[0].data,
              paymentMethod: lines[0].fpagament,
              subtotal,
              vatBreakdown: Object.entries(vatBreakdown).map(([rate, values]) => ({
                rate: parseFloat(rate),
                ...values,
              })),
              total,
            };
          }
        );
        setInvoices(processedInvoices.sort((a,b) => b.invoiceNumber.localeCompare(a.invoiceNumber)));

      } catch (err: any) {
        setError(err.message || "S'ha produït un error desconegut.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handlePrint = () => {
    window.print();
  };

  const selectedInvoice = invoices.find((inv) => inv.invoiceNumber === selectedInvoiceNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregant documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="no-print mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <Select
                onValueChange={setSelectedInvoiceNumber}
                defaultValue={selectedInvoiceNumber || undefined}
            >
            <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Selecciona una factura" />
            </SelectTrigger>
            <SelectContent>
                {invoices.map((invoice) => (
                <SelectItem key={invoice.invoiceNumber} value={invoice.invoiceNumber}>
                    Factura: {invoice.invoiceNumber} - {invoice.date}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
            {selectedInvoice && (
                <div className="flex w-full gap-2 sm:w-auto">
                    <Button onClick={handlePrint} className="w-full">
                        <Printer className="mr-2" /> Imprimir PDF
                    </Button>
                    <Button onClick={() => setSelectedInvoiceNumber(null)} variant="outline" className="w-full">
                        <ArrowLeft className="mr-2" /> Tornar
                    </Button>
                </div>
            )}
        </div>

        {!selectedInvoice && (
            <Card className='text-center py-20'>
                <CardHeader>
                    <FileText className='mx-auto h-12 w-12 text-muted-foreground'/>
                    <CardTitle>Cap factura seleccionada</CardTitle>
                    <CardDescription>Si us plau, tria una factura de la llista per veure els detalls.</CardDescription>
                </CardHeader>
            </Card>
        )}

        {selectedInvoice && (
            <div id="zona-factura" className="mx-auto max-w-4xl rounded-lg border bg-white p-4 shadow-sm sm:p-8">
                {/* Capçalera de la factura */}
                <header className="mb-8 grid grid-cols-1 gap-8 border-b pb-8 sm:grid-cols-2">
                    <div>
                    <Logo className="h-20"/>
                    <p className="mt-4 font-bold">{selectedInvoice.ourCompany.empresa}</p>
                    <p className="text-sm text-muted-foreground">{selectedInvoice.ourCompany.adreca}</p>
                    <p className="text-sm text-muted-foreground">NIF: {selectedInvoice.ourCompany.fiscalid}</p>
                    <p className="text-sm text-muted-foreground">Tel: {selectedInvoice.ourCompany.telefon}</p>
                    </div>
                    <div className="text-left sm:text-right">
                        <h2 className="text-2xl font-bold text-primary">FACTURA</h2>
                        <p className="font-semibold">#{selectedInvoice.invoiceNumber}</p>
                        <p className="text-sm text-muted-foreground">Data: {new Date(selectedInvoice.date).toLocaleDateString('ca-ES')}</p>
                        <div className="mt-4 rounded-md border bg-muted/30 p-4 text-left">
                            <p className="font-semibold">Client:</p>
                            <p className="font-bold">{selectedInvoice.client.empresa || selectedInvoice.client.nom}</p>
                            <p className="text-sm text-muted-foreground">{selectedInvoice.client.adreca}</p>
                            <p className="text-sm text-muted-foreground">NIF: {selectedInvoice.client.fiscalid}</p>
                            <p className="text-sm text-muted-foreground">Tel: {selectedInvoice.client.telefon}</p>
                        </div>
                    </div>
                </header>
                
                {/* Línies de la factura */}
                <main className="mb-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Concepte</TableHead>
                                <TableHead className="text-right">Preu</TableHead>
                                <TableHead className="text-right">Unitats</TableHead>
                                <TableHead className="text-right">Dte. %</TableHead>
                                <TableHead className="text-right">Total Net</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedInvoice.lines.map((line, index) => {
                                const price = parseFloat(line.preu_unitari) || 0;
                                const units = parseFloat(line.unitats) || 0;
                                const discount = parseFloat(line.dte) || 0;
                                const lineTotal = price * units * (1 - discount / 100);
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{line.concepte}</TableCell>
                                        <TableCell className="text-right">{price.toFixed(2)} €</TableCell>
                                        <TableCell className="text-right">{units}</TableCell>
                                        <TableCell className="text-right">{discount.toFixed(2)}%</TableCell>
                                        <TableCell className="text-right font-medium">{lineTotal.toFixed(2)} €</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </main>

                {/* Totals de la factura */}
                <section className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                    <p className='font-semibold'>Forma de pagament:</p>
                    <p className='text-muted-foreground'>{selectedInvoice.paymentMethod}</p>
                    </div>
                    <div className="space-y-2 rounded-md border bg-muted/30 p-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Imposable</span>
                        <span className="font-medium">{selectedInvoice.subtotal.toFixed(2)} €</span>
                    </div>
                    <Separator/>
                    {selectedInvoice.vatBreakdown.map(item => (
                        <div key={item.rate} className="flex justify-between">
                            <span className="text-muted-foreground">Quota {item.rate}% s/ {item.base.toFixed(2)}€</span>
                            <span className="font-medium">{item.amount.toFixed(2)} €</span>
                        </div>
                    ))}
                    <Separator/>
                    <div className="flex justify-between text-lg font-bold text-primary">
                        <span>TOTAL</span>
                        <span>{selectedInvoice.total.toFixed(2)} €</span>
                    </div>
                    </div>
                </section>
                
                {/* Peu de la factura */}
                <footer className="border-t pt-4 text-xs text-muted-foreground">
                    <p>
                    Inscrita al Registre Mercantil de [Ciutat], Tom [Número], Foli [Número], Full [Número].
                    </p>
                    <p>
                    De conformitat amb el que estableix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell, de 27 d'abril de 2016, l'informem que les seves dades seran tractades sota la responsabilitat de {selectedInvoice.ourCompany.empresa} per a la gestió de la relació comercial.
                    </p>
                </footer>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
