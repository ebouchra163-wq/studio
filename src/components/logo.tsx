import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-10 items-center", className)}>
      <Image
        src="/logo.png"
        alt="Logo de la empresa"
        width={140}
        height={35}
        className="h-auto w-auto object-contain"
        priority
      />
    </div>
  );
}
