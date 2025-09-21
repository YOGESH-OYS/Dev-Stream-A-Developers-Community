'use client'

import ScrollEffect from '@/app/components/ScroolEffect/scroll';
import CompilerComponent from './CompilerComponent';

export default function CompilerPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollEffect />
      <CompilerComponent />
    </div>
  );
}
