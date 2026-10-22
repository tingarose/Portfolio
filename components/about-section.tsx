'use client';

import { useEffect, useRef, useState } from 'react';
import cloud from '../images/cloud.png';
import aboutMeMiffy from '../images/aboutmemiffy.png';

const cloudPlacements = [
  'left-[7%] top-[22%] w-24 sm:left-[12%] sm:w-32 lg:w-40',
  'left-1/2 top-[12%] hidden w-28 -ml-14 sm:block lg:-ml-20 lg:w-40',
  'right-[7%] top-[24%] w-24 sm:right-[12%] sm:w-32 lg:w-40',
  'bottom-[20%] left-[11%] hidden w-32 sm:block lg:left-[15%] lg:w-40',
  'bottom-[19%] right-[8%] w-24 sm:right-[13%] sm:w-32 lg:w-40',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRefs = useRef<Array<HTMLImageElement | null>>([]);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const positionCloudStarts = () => {
      const centerX = section.clientWidth / 2;
      const centerY = section.clientHeight / 2;

      cloudRefs.current.forEach((cloudElement) => {
        if (!cloudElement) return;
        const cloudCenterX = cloudElement.offsetLeft + cloudElement.offsetWidth / 2;
        const cloudCenterY = cloudElement.offsetTop + cloudElement.offsetHeight / 2;

        cloudElement.style.setProperty(
          '--cloud-from-x',
          `${centerX - cloudCenterX}px`,
        );
        cloudElement.style.setProperty(
          '--cloud-from-y',
          `${centerY - cloudCenterY}px`,
        );
      });
    };

    positionCloudStarts();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEntered(true);
      return;
    }

    let animationFrame: number | null = null;
    let animationActive = false;

    const updateFromViewport = () => {
      animationFrame = null;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isOffScreen = rect.bottom <= 0 || rect.top >= viewportHeight;

      if (isOffScreen) {
        animationActive = false;
        setHasEntered(false);
        return;
      }

      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / Math.max(rect.height, 1);

      if (visibleRatio >= 0.12) {
        if (!animationActive) {
          positionCloudStarts();
          animationActive = true;
        }
        setHasEntered(true);
      }
    };

    const scheduleViewportUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateFromViewport);
    };

    updateFromViewport();
    window.addEventListener('scroll', scheduleViewportUpdate, { passive: true });
    window.addEventListener('resize', scheduleViewportUpdate);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('scroll', scheduleViewportUpdate);
      window.removeEventListener('resize', scheduleViewportUpdate);
    };
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

      {cloudPlacements.map((placement, index) => (
        <img
          key={placement}
          ref={(element) => {
            cloudRefs.current[index] = element;
          }}
          src={cloud.src}
          alt=""
          aria-hidden="true"
          width={cloud.width}
          height={cloud.height}
          className={`absolute z-[1] h-auto drop-shadow-[0_12px_24px_rgba(87,104,136,0.08)] ${placement} motion-reduce:transition-none`}
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered
              ? 'translate3d(0, 0, 0) scale(1)'
              : 'translate3d(var(--cloud-from-x, 0px), var(--cloud-from-y, 0px), 0) scale(0.18)',
            transition:
              'transform 1000ms cubic-bezier(0.2, 0.78, 0.2, 1), opacity 650ms ease-out',
            transitionDelay: `${index * 90}ms`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <div className="relative z-10 flex max-w-md flex-col items-center rounded-[2.5rem] border border-white bg-[#fffdfa]/85 px-8 py-10 text-center shadow-[0_24px_70px_rgba(73,78,94,0.13)] backdrop-blur-md sm:px-12 sm:py-12">
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
          A little about me... more coming soon.
        </p>
      </div>
    </section>
  );
}
