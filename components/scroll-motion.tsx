'use client';

import { useEffect } from 'react';

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;

      const animations = new Set<Animation>();
      const revealTargets = document.querySelectorAll<HTMLElement>(
        '[data-scroll-reveal], #engineering article, #product-growth article',
      );
      const observer = new IntersectionObserver((entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        entering.forEach((entry, index) => {
          observer.unobserve(entry.target);
          const animation = entry.target.animate(
            [{ opacity: 0, translate: `${index % 2 ? 24 : -24}px 36px` }, { opacity: 1, translate: '0 0' }],
            { duration: 750, delay: Math.min(index * 90, 180), easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

      // Leave the initial viewport and previously passed content undisturbed.
      revealTargets.forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
      });

      const layers = desktop.matches
        ? [...document.querySelectorAll<HTMLElement>('[data-scroll-depth]')]
        : [];
      const chapters = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
      const links = [...document.querySelectorAll<HTMLAnchorElement>('nav a[data-scroll-target]')];
      let frame = 0;
      const update = () => {
        frame = 0;
        layers.forEach((element) => {
          const section = element.closest('section, footer');
          if (!section) return;
          const bounds = section.getBoundingClientRect();
          const travel = section.id === 'hero'
            ? Math.max(0, Math.min(-bounds.top + 64, bounds.height))
            : Math.max(-400, Math.min(400, window.innerHeight * 0.5 - bounds.top - bounds.height * 0.5));
          const offset = travel * Number(element.dataset.scrollDepth);
          element.style.translate = `0 ${offset.toFixed(2)}px`;
        });
        let current = 'top';
        chapters.forEach((section) => {
          if (section.getBoundingClientRect().top < window.innerHeight * 0.4) current = section.id;
        });
        links.forEach((link) => {
          const selected = link.dataset.scrollTarget === current;
          if (selected) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      const revealFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        for (const animation of animations) {
          const target = (animation.effect as KeyframeEffect).target;
          if (target instanceof Element && target.contains(event.target)) animation.finish();
        }
      };
      update();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      document.addEventListener('focusin', revealFocused);
      dispose = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        document.removeEventListener('focusin', revealFocused);
        layers.forEach((element) => element.style.removeProperty('translate'));
        links.forEach((link) => link.removeAttribute('aria-current'));
      };
    };

    setup();
    preference.addEventListener('change', setup);
    desktop.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
      desktop.removeEventListener('change', setup);
    };
  }, []);

  return null;
}
