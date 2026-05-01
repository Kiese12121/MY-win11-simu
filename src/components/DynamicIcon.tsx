import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

interface DynamicIconProps {
  src?: string;
  name?: string;
  lucideName?: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ src = "", name = "", lucideName, className = "w-full h-full", size = 24 }: DynamicIconProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    const IconComponent = (LucideIcons as any)[lucideName || 'LayoutGrid'];
    return (
      <div className={`${className} flex items-center justify-center bg-white/10 rounded-lg p-1`}>
        {IconComponent ? <IconComponent size={size} className="text-white" /> : <LucideIcons.LayoutGrid size={size} className="text-white" />}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      className={className} 
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}
