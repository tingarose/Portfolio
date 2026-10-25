"use client";

import { useSyncExternalStore } from 'react';

const query = '(min-width: 768px)';
function subscribe(update: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}
function getSnapshot() { return window.matchMedia(query).matches; }
function getServerSnapshot() { return false; }

export function useDesktopLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
