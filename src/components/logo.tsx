import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de la empresa"
        width={200}
        height={55}
        className="h-14 w-auto object-contain"
        priority
      />
    </div>
  );
}
