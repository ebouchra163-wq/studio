import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <div className={cn("flex items-center h-full", className)}>
      <Image
        src="/Logo_Bouchra__2_-removebg-preview.png"
        alt="Logo de la empresa"
        width={500}
        height={200}
        className={cn("h-full w-auto object-contain", imageClassName)}
        priority
      />
    </div>
  );
}
