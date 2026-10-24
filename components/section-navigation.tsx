"use client";

import { useEffect } from 'react';

const pendingSectionKey = 'ivy-portfolio-section';

export function SectionNavigation() {
  useEffect(() => {
    function cleanUrl() {
      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      }
    }

    function scrollToSection(id: string) {
      const section = document.getElementById(id);
      if (!section) return false;
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      return true;
    }

    function handleLegacyFragment() {
      let id = '';
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { /* Ignore malformed fragments. */ }
      cleanUrl();
      if (id) scrollToSection(id);
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[data-scroll-target]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const id = link.dataset.scrollTarget;
      if (!id) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      if (destination.pathname === window.location.pathname && document.getElementById(id)) {
        event.preventDefault();
        cleanUrl();
        scrollToSection(id);
      } else {
        // Carry the destination through a normal page load without a URL fragment.
        try { window.sessionStorage.setItem(pendingSectionKey, id); } catch { /* The clean link still works when storage is unavailable. */ }
      }
    }

    let pending = '';
    if (window.location.pathname === '/') {
      try {
        pending = window.sessionStorage.getItem(pendingSectionKey) || '';
        window.sessionStorage.removeItem(pendingSectionKey);
      } catch { /* Storage is optional. */ }
    }
    if (window.location.hash) handleLegacyFragment();
    else if (pending) scrollToSection(pending);

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleLegacyFragment);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleLegacyFragment);
    };
  }, []);

  return null;
}
