'use client';

import { useRef } from 'react';

type EngineeringProjectCardProps = {
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  imageBackground: string;
};

export function EngineeringProjectCard({
  title,
  imageSrc,
  imageWidth,
  imageHeight,
  alt,
  imageBackground,
}: EngineeringProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === 'touch') return;

    const bounds = card.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - vertical) * 10;
    const rotateY = (horizontal - 0.5) * 10;

    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
    card.style.setProperty('--shine-x', `${horizontal * 100}%`);
    card.style.setProperty('--shine-y', `${vertical * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--shine-x', '50%');
    card.style.setProperty('--shine-y', '50%');
  };

  return (
    <div className="h-full [perspective:1000px]">
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="group/card relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white/75 p-4 shadow-[0_18px_50px_rgba(73,78,94,0.08)] backdrop-blur transition-[transform,box-shadow] duration-150 ease-out [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] [transform-style:preserve-3d] [will-change:transform] hover:shadow-[0_28px_65px_rgba(73,78,94,0.16)] motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] opacity-0 mix-blend-screen transition-opacity duration-200 group-hover/card:opacity-50 motion-reduce:hidden"
          style={{
            background:
              'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.8), transparent 28%), linear-gradient(125deg, rgba(255,171,171,0.18), rgba(173,216,255,0.28), rgba(208,174,255,0.2), rgba(255,239,166,0.18))',
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col [transform:translateZ(20px)] [transform-style:preserve-3d]">
          <div className="flex items-center justify-between px-1 py-1">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#7b7f89]">
              Engineering
            </span>
            <span className="size-2 rounded-full bg-[#315fca]" aria-hidden="true" />
          </div>
          <div
            className={`mt-3 flex h-56 items-center justify-center overflow-hidden rounded-[1.55rem] ${imageBackground}`}
          >
            <img
              src={imageSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover/card:scale-[1.03]"
            />
          </div>
          <h3 className="display-font mt-5 px-1 text-2xl italic tracking-[-0.02em]">
            {title}
          </h3>
          <p className="mt-2 px-1 text-sm leading-6 text-[#777a84]">Project details coming soon.</p>
        </div>
      </article>
    </div>
  );
}
