import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string; }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de l'empresa"
        width={500}
        height={200}
        className="w-auto h-full object-contain"
        priority
      />
    </div>
  );
}
