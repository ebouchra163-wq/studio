import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, isHeader = false }: { className?: string; isHeader?: boolean; }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de la empresa"
        width={500}
        height={200}
        className={cn(
          "w-auto object-contain",
          isHeader ? "h-16 transform scale-175" : "h-12"
        )}
        priority
      />
    </div>
  );
}
