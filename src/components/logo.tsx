import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Image src="/logo.png" alt="Global Cargo Care Logo" width={100} height={24} className="h-6 w-auto" />
      <span className="sr-only">Global Cargo Care</span>
    </div>
  );
}
