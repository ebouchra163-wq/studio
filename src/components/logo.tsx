import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Globe className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold text-foreground">
        Global Cargo Care
      </span>
    </div>
  );
}
