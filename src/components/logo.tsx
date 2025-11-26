import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Image src="/logo.png" alt="Global Cargo Care Logo" width={24} height={24} />
      <span className="font-headline text-xl font-bold">Global Cargo Care</span>
    </div>
  );
}
