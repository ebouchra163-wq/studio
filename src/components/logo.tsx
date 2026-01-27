import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de la empresa"
        width={180}
        height={50}
        className="h-12 w-auto object-contain"
        priority
      />
    </div>
  );
}
