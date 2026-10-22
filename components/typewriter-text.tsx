'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'engineer',
  'matcha lover',
  'product builder',
  'problem solver',
];

export function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const phrase = phrases[phraseIndex];
    const delay = isDeleting ? 52 : 92;

    const timer = window.setTimeout(() => {
      if (!isDeleting && displayedText === phrase) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayedText === '') {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setIsDeleting(false);
        return;
      }

      const nextLength = displayedText.length + (isDeleting ? -1 : 1);
      setDisplayedText(phrase.slice(0, Math.max(0, nextLength)));
    }, displayedText === phrase && !isDeleting
      ? 1500
      : displayedText === ''
        ? 280
        : delay);

    return () => window.clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <p className="min-h-8 min-w-[16ch] text-xl font-medium tracking-[-0.02em] text-[#315fca] sm:text-2xl">
      <span aria-hidden="true">
        {displayedText}
        <span className="ml-0.5 inline-block animate-pulse font-light text-[#8baee8]">|</span>
      </span>
      <span className="sr-only">
        Engineer, matcha lover, product builder, and problem solver.
      </span>
    </p>
  );
}
