import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de la empresa"
        width={300}
        height={80}
        className="h-[52px] w-auto object-contain md:h-[60px]"
        priority
      />
    </div>
  );
}
