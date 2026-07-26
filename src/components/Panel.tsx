import { HTMLAttributes } from 'react';
import { cn } from '../utils';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function Panel({ className, active, children, ...props }: PanelProps) {
  return (
    <div 
      className={cn(
        "bg-cyber-panel backdrop-blur-[20px] border border-cyber-border p-4 transition-all duration-300",
        active && "cyber-panel-active",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
