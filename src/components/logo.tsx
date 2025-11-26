import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt="Global Cargo Care Logo"
        width={160}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
}
