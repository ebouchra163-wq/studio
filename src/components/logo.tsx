import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/Logo_Bouchra.png"
        alt="Logo de la empresa"
        width={140}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    </div>
  );
}
