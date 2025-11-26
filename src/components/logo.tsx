import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image 
        src="/logo.png" 
        alt="Logotipo de la empresa" 
        width={150} 
        height={40} 
        className="h-10 w-auto dark:mix-blend-screen" 
        priority
      />
    </div>
  );
}
