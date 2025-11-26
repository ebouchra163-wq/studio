import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Image src="/logo.png" alt="Global Cargo Care Logo" width={120} height={30} className="h-8 w-auto" />
      <span className="sr-only">Global Cargo Care</span>
    </div>
  );
}
