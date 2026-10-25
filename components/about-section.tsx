'use client';

import { useEffect, useRef } from 'react';
import aboutMeMiffy from '../images/aboutmemiffy.png';

const cloudPlacements = [
  { word: 'Curious', placement: 'left-[3%] top-[4%] w-28 md:top-[18%] md:w-36 lg:left-[8%]' },
  { word: 'Creative', placement: 'right-[3%] top-[4%] w-28 md:top-[18%] md:w-36 lg:right-[8%]' },
  { word: 'Empathetic', placement: 'bottom-[3%] left-[3%] w-28 md:bottom-[18%] md:w-36 lg:left-[8%]' },
  { word: 'Driven', placement: 'bottom-[3%] right-[3%] w-28 md:bottom-[18%] md:w-36 lg:right-[8%]' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    let entered = false;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        entered = false;
        animations.splice(0).forEach((animation) => animation.cancel());
        return;
      }
      if (entered) return;
      entered = true;
      const center = card.getBoundingClientRect();
      cloudRefs.current.forEach((cloud, index) => {
        if (!cloud || typeof cloud.animate !== 'function') return;
        const bounds = cloud.getBoundingClientRect();
        const x = center.left + center.width / 2 - bounds.left - bounds.width / 2;
        const y = center.top + center.height / 2 - bounds.top - bounds.height / 2;
        animations.push(cloud.animate([
          { opacity: 0.1, transform: `translate(${x}px, ${y}px) scale(0.18)` },
          { opacity: 1, transform: 'translate(0, 0) scale(1)' },
        ], { duration: 800, delay: index * 70, easing: 'cubic-bezier(0.2, 0.78, 0.2, 1)', fill: 'backwards' }));
      });
    }, { threshold: 0.05 });
    observer.observe(section);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate mx-auto flex min-h-[44rem] w-full max-w-7xl scroll-mt-20 items-center justify-center overflow-hidden px-6 py-20 md:px-10 lg:px-14"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-6 inset-y-10 z-0 rounded-[3rem] border border-white/75 bg-white/45 shadow-[0_30px_90px_rgba(73,78,94,0.08)] backdrop-blur-sm md:inset-x-10 lg:inset-x-14"
      />

      {cloudPlacements.map(({ word, placement }, index) => (
        <div
          key={word}
          data-cloud={word.toLowerCase()}
          ref={(element) => {
            cloudRefs.current[index] = element;
          }}
          className={`about-cloud pointer-events-none absolute z-[1] text-[#8994aa] ${placement} motion-reduce:transition-none`}

        >
          <svg role="img" aria-label={word} viewBox="0 0 160 100" fill="none" className="block h-auto w-full" focusable="false">
            <path
              d="M39 76C23 76 13 66 13 53C13 40 23 30 36 30C40 17 51 10 64 13C73 2 90 3 100 12C111 11 122 19 124 31C138 32 148 42 148 55C148 67 138 76 124 76Z"
              fill="#fffdfb"
              fillOpacity="0.85"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <text x="80" y="48" textAnchor="middle" dominantBaseline="middle" fill="#5c6d8c" fontSize="20" fontWeight="500">{word}</text>
          </svg>
        </div>
      ))}

      <div ref={cardRef} className="about-card relative z-10 flex max-w-md flex-col items-center rounded-[2.5rem] border border-white bg-[#fffdfa]/85 px-8 py-10 text-center shadow-[0_24px_70px_rgba(73,78,94,0.13)] backdrop-blur-md sm:px-12 sm:py-12">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#777b86]">
          A little context
        </p>
        <h2
          id="about-heading"
          className="display-font mt-3 text-5xl font-normal italic tracking-[-0.04em] sm:text-6xl"
        >
          About me
        </h2>
        <img
          src={aboutMeMiffy.src}
          alt="Miffy with purple and pink stars"
          width={aboutMeMiffy.width}
          height={aboutMeMiffy.height}
          className="mt-4 h-auto w-36 sm:w-44"
        />
        <p className="mt-5 max-w-sm text-base leading-7 text-[#6f727c] sm:text-lg">
          I’m a bioengineer who turns real needs into thoughtful medical devices through research, prototyping, and testing. I bring curiosity, empathy, and creative problem-solving to the teams and people I work with.
        </p>
      </div>
    </section>
  );
}
