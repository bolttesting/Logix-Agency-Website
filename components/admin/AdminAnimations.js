'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function AdminAnimations() {
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.from('.admin-sidebar-item', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.admin-content-anim', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.admin-card-anim', {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.4
      });

      gsap.from('.admin-list-item', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        delay: 0.5
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
