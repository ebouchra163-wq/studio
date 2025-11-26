import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Logo de la empresa"
        width={120}
        height={30}
        className="object-contain"
        priority
      />
    </div>
  );
}
