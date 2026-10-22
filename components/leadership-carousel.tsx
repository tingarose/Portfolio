'use client';

import * as React from 'react';
import { leadershipExperience } from '@/lib/portfolio-content';

import technicalMiffyOne from '../images/technicalmiffy1.png';
import technicalMiffyTwo from '../images/technicalmiffy2.png';
import technicalMiffyThree from '../images/technicalmiffy3.png';
import ivyMiffy from '../images/ivymiffy.png';



const illustrations = [technicalMiffyOne, technicalMiffyTwo, technicalMiffyThree, ivyMiffy];
const leadershipSlides = leadershipExperience.map((experience, index) => ({
  ...experience,
  image: illustrations[index % illustrations.length],
}));
const anglePerSlide = 360 / leadershipSlides.length;

function wrapIndex(index: number) {
  return (
    (index % leadershipSlides.length) + leadershipSlides.length
  ) % leadershipSlides.length;
}

function shortestOffset(index: number, selectedIndex: number) {
  let offset = index - selectedIndex;
  const half = leadershipSlides.length / 2;

  if (offset > half) offset -= leadershipSlides.length;
  if (offset < -half) offset += leadershipSlides.length;

  return offset;
}

export function LeadershipCarousel() {
  const initialRotation = 0;
  const [rotationAngle, setRotationAngle] = React.useState(initialRotation);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const rotationAngleRef = React.useRef(initialRotation);
  const angularVelocity = React.useRef(0);
  const animationFrame = React.useRef<number | null>(null);
  const pointerStartX = React.useRef<number | null>(null);
  const previousPointerX = React.useRef<number | null>(null);
  const previousPointerTime = React.useRef(0);
  const didDrag = React.useRef(false);
  const selectedIndex = wrapIndex(
    Math.round(-rotationAngle / anglePerSlide),
  );

  const commitRotation = React.useCallback((angle: number) => {
    rotationAngleRef.current = angle;
    setRotationAngle(angle);
  }, []);

  const cancelSpin = React.useCallback(() => {
    if (animationFrame.current !== null) {
      window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    angularVelocity.current = 0;
    setIsSpinning(false);
  }, []);

  React.useEffect(() => cancelSpin, [cancelSpin]);

  const startMomentum = React.useCallback(
    (releaseVelocity: number, dragDistance: number) => {
      cancelSpin();

      const spinStartAngle = rotationAngleRef.current;
      const direction = Math.sign(releaseVelocity || dragDistance);
      const releaseSpeed = Math.min(720, Math.abs(releaseVelocity) * 1.15);
      const coastDistance = Math.min(
        anglePerSlide * 3,
        releaseSpeed * 0.23,
      );
      const landingAngle = Math.round((spinStartAngle + direction * coastDistance) / anglePerSlide) * anglePerSlide;
      const landingDistance = Math.abs(landingAngle - spinStartAngle);

      if (landingDistance < 0.5) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        commitRotation(landingAngle);
        return;
      }

      const durationSeconds = Math.max(
        0.55,
        Math.min(
          1.15,
          (2 * landingDistance) / Math.max(releaseSpeed, 90),
        ),
      );
      const spinStartTime = performance.now();
      setIsSpinning(true);

      const spin = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - spinStartTime) / (durationSeconds * 1000),
          1,
        );
        const easedProgress = 1 - (1 - progress) ** 2;
        commitRotation(
          spinStartAngle + (landingAngle - spinStartAngle) * easedProgress,
        );

        if (progress >= 1) {
          animationFrame.current = null;
          angularVelocity.current = 0;
          setIsSpinning(false);
          return;
        }

        animationFrame.current = window.requestAnimationFrame(spin);
      };

      animationFrame.current = window.requestAnimationFrame(spin);
    },
    [cancelSpin, commitRotation],
  );

  const showPrevious = React.useCallback(() => {
    cancelSpin();
    commitRotation(rotationAngleRef.current + anglePerSlide);
  }, [cancelSpin, commitRotation]);

  const showNext = React.useCallback(() => {
    cancelSpin();
    commitRotation(rotationAngleRef.current - anglePerSlide);
  }, [cancelSpin, commitRotation]);

  const showSlide = (index: number) => {
    cancelSpin();
    commitRotation(
      rotationAngleRef.current -
        shortestOffset(index, selectedIndex) * anglePerSlide,
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    cancelSpin();
    pointerStartX.current = event.clientX;
    previousPointerX.current = event.clientX;
    previousPointerTime.current = performance.now();
    angularVelocity.current = 0;
    didDrag.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      pointerStartX.current === null ||
      previousPointerX.current === null
    ) {
      return;
    }

    const currentTime = performance.now();
    const distance = event.clientX - pointerStartX.current;
    const pointerDelta = event.clientX - previousPointerX.current;
    const timeDelta = Math.max(currentTime - previousPointerTime.current, 1);
    const angleDelta = pointerDelta * 0.25;
    const instantaneousVelocity = (angleDelta / timeDelta) * 1000;

    didDrag.current = didDrag.current || Math.abs(distance) > 5;
    angularVelocity.current =
      angularVelocity.current * 0.45 + instantaneousVelocity * 0.55;
    previousPointerX.current = event.clientX;
    previousPointerTime.current = currentTime;
    commitRotation(rotationAngleRef.current + angleDelta);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;

    const currentTime = performance.now();
    const distance = event.clientX - pointerStartX.current;
    const releaseVelocity =
      currentTime - previousPointerTime.current > 100
        ? 0
        : angularVelocity.current;
    pointerStartX.current = null;
    previousPointerX.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distance) < 5) {
      return;
    }

    startMomentum(releaseVelocity, distance);
  };

  const handlePointerCancel = () => {
    pointerStartX.current = null;
    previousPointerX.current = null;
    didDrag.current = false;
    setIsDragging(false);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Leadership highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className="relative h-[43rem] w-full touch-pan-y cursor-grab select-none overflow-visible rounded-[2rem] outline-none [perspective:1800px] [transform-style:preserve-3d] active:cursor-grabbing focus-visible:ring-4 focus-visible:ring-[#315fca]/30 sm:h-[40rem] lg:h-[41rem]"
    >
      <div
        className={`absolute left-1/2 top-1/2 h-[34rem] w-[17rem] sm:h-[30rem] sm:w-[23rem] will-change-transform [transform-style:preserve-3d] motion-reduce:transition-none ${
          isDragging || isSpinning
            ? 'transition-none'
            : 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]'
        }`}
        style={{
          transform: `translate(-50%, -50%) rotateY(${rotationAngle}deg)`,
        }}
      >
        {leadershipSlides.map((slide, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={slide.title}
              type="button"
              onClick={() => {
                if (didDrag.current) {
                  didDrag.current = false;
                  return;
                }

                showSlide(index);
              }}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={isSelected ? 'true' : undefined}
              className="absolute inset-0 block cursor-pointer rounded-2xl border border-white/90 p-0 shadow-[0_22px_55px_rgba(57,67,98,0.2)] outline-none [transform-style:preserve-3d] focus-visible:ring-4 focus-visible:ring-[#315fca]/35"
              style={{
                transform: `rotateY(${index * anglePerSlide}deg) translateZ(clamp(13rem, 28vw, 22rem))`,
              }}
            >
              <span className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#fffdfa] p-6 text-left [backface-visibility:hidden] sm:p-7">
                <span className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#8a8e98]">0{index + 1} / Leadership</span>
                  <img src={slide.image.src} alt="" draggable={false} width={slide.image.width} height={slide.image.height} className="size-16 object-contain" />
                </span>
                <span className="text-[0.65rem] font-semibold uppercase leading-5 tracking-[0.12em] text-[#5c6d8c]">{slide.metric}</span>
                <span className="display-font mt-3 text-[1.85rem] italic leading-tight text-[#343741]">{slide.title}</span>
                <span className="mt-4 text-sm font-normal leading-6 text-[#676b75]">{slide.text}</span>
              </span>
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl bg-[#e7eef9] p-12 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <img src={slide.image.src} alt="" draggable={false} width={slide.image.width} height={slide.image.height} className="h-auto w-full object-contain opacity-80" />
              </span>            </button>
          );
        })}
      </div>

      <p
        className="sr-only"
        aria-live={isDragging || isSpinning ? 'off' : 'polite'}
      >
        Slide {selectedIndex + 1} of {leadershipSlides.length}:{' '}
        {leadershipSlides[selectedIndex]?.title}
      </p>
      <p className="sr-only">
        Drag horizontally with a mouse or swipe to rotate the leadership cards. You can
        also use the left and right arrow keys.
      </p>
    </div>
  );
}
