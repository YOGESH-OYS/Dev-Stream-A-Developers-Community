'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export default function ScrollEffect() {
  useEffect(() => {
    const wrapper = document.getElementById('scroll-wrapper');
    const content = document.getElementById('scroll-content');

    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper: wrapper,
      content: content,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => lenis.destroy();
  }, []);

  return null;
}
