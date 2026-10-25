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

function LeadershipCardContent({ slide, index }: { slide: (typeof leadershipSlides)[number]; index: number }) {
  return (
<span className="leadership-card-front absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#fffdfa] p-6 text-left [backface-visibility:hidden] sm:p-7">
                <span className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#8a8e98]">0{index + 1} / Leadership</span>
                  <img src={slide.image.src} alt="" draggable={false} width={slide.image.width} height={slide.image.height} className="size-16 object-contain" />
                </span>
                <span className="text-[0.65rem] font-semibold uppercase leading-5 tracking-[0.12em] text-[#5c6d8c]">{slide.metric}</span>
                <span className="display-font mt-3 text-[1.85rem] italic leading-tight text-[#343741]">{slide.title}</span>
                <span className="leadership-card-organization mt-2 text-xs font-semibold leading-5 text-[#5c6d8c]">{slide.organization}</span>
                <span className="leadership-card-description mt-4 text-sm font-normal leading-6 text-[#676b75]">{slide.text}</span>
                <span className="leadership-card-skills mt-3 text-xs leading-5 text-[#5c6d8c]">
                  <span className="font-semibold">Skills developed</span>
                  <span role="list" className="mt-1 block space-y-1">
                    {slide.skills.map((skill) => <span role="listitem" key={skill} className="block">• {skill}</span>)}
                  </span>
                </span>
              </span>
  );
}

function MobileLeadershipCarousel() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const showSlide = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[wrapIndex(index)] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="leadership-mobile" aria-roledescription="carousel" aria-label="Leadership highlights">
      <div
        ref={trackRef}
        className="leadership-mobile-track"
        onScroll={() => {
          const track = trackRef.current;
          if (!track || track.children.length < 2) return;
          const first = track.children[0] as HTMLElement;
          const second = track.children[1] as HTMLElement;
          setActiveIndex(Math.max(0, Math.min(leadershipSlides.length - 1,
            Math.round(track.scrollLeft / (second.offsetLeft - first.offsetLeft)))));
        }}
      >
        {leadershipSlides.map((slide, index) => (
          <article key={slide.title} aria-roledescription="slide" aria-label={`${index + 1} of ${leadershipSlides.length}: ${slide.title}`}>
            <LeadershipCardContent slide={slide} index={index} />
          </article>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => showSlide(activeIndex - 1)} aria-label="Previous leadership highlight" className="min-h-11 min-w-11 rounded-full border border-[#dedfe3] text-lg focus-visible:outline-2 focus-visible:outline-[#315fca]">←</button>
        <p className="text-xs text-[#5c6d8c]" aria-live="polite">{activeIndex + 1} / {leadershipSlides.length} · Swipe to explore</p>
        <button type="button" onClick={() => showSlide(activeIndex + 1)} aria-label="Next leadership highlight" className="min-h-11 min-w-11 rounded-full border border-[#dedfe3] text-lg focus-visible:outline-2 focus-visible:outline-[#315fca]">→</button>
      </div>
    </section>
  );
}

export function LeadershipCarousel() {
  return (
    <>
      <MobileLeadershipCarousel />
      <DesktopLeadershipCarousel />
    </>
  );
}

function DesktopLeadershipCarousel() {
  const rotor = React.useRef<HTMLDivElement>(null);
  const angle = React.useRef(0);
  const motionFrame = React.useRef<number | null>(null);
  const dragFrame = React.useRef<number | null>(null);
  const gesture = React.useRef<{ id: number; x: number; y: number; lastX: number; time: number; velocity: number; active: boolean } | null>(null);
  const didDrag = React.useRef(false);
  const [selected, setSelected] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);

  function paint(next: number) {
    angle.current = next;
    if (rotor.current) rotor.current.style.transform = `translate(-50%, -50%) rotateY(${next}deg)`;
  }
  function cancelFrames() {
    if (motionFrame.current !== null) cancelAnimationFrame(motionFrame.current);
    if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current);
    motionFrame.current = null;
    dragFrame.current = null;
  }
  React.useEffect(() => () => {
    if (motionFrame.current !== null) cancelAnimationFrame(motionFrame.current);
    if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current);
  }, []);

  function settle(next: number) {
    paint(next);
    setSelected(wrapIndex(Math.round(-next / anglePerSlide)));
    setDragging(false);
    setSpinning(false);
  }
  function animateTo(destination: number) {
    cancelFrames();
    const start = angle.current;
    paint(start);
    if (Math.abs(destination - start) < 0.01 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settle(destination);
      return;
    }
    const duration = Math.max(320, Math.min(650, Math.abs(destination - start) * 3));
    const started = performance.now();
    setSpinning(true);
    const tick = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - started) / duration));
      paint(start + (destination - start) * (1 - (1 - progress) ** 3));
      if (progress < 1) motionFrame.current = requestAnimationFrame(tick);
      else { motionFrame.current = null; settle(destination); }
    };
    motionFrame.current = requestAnimationFrame(tick);
  }
  function cancelGesture() {
    gesture.current = null;
    didDrag.current = false;
    cancelFrames();
    settle(Math.round(angle.current / anglePerSlide) * anglePerSlide);
  }
  function pointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.isPrimary === false) return;
    cancelFrames();
    paint(angle.current);
    setSpinning(false);
    didDrag.current = false;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, time: performance.now(), velocity: 0, active: false };
  }
  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const x = event.clientX - current.x;
    const y = event.clientY - current.y;
    if (!current.active) {
      if (Math.max(Math.abs(x), Math.abs(y)) < 8) return;
      if (Math.abs(y) > Math.abs(x)) { cancelGesture(); return; }
      try { event.currentTarget.setPointerCapture(event.pointerId); }
      catch { cancelGesture(); return; }
      current.active = true;
      didDrag.current = true;
      setDragging(true);
    }
    const now = performance.now();
    const delta = (event.clientX - current.lastX) * 0.3;
    current.velocity = current.velocity * 0.5 + delta / Math.max(1, now - current.time) * 500;
    current.lastX = event.clientX;
    current.time = now;
    angle.current += delta;
    if (dragFrame.current === null) {
      dragFrame.current = requestAnimationFrame(() => { dragFrame.current = null; paint(angle.current); });
    }
  }
  function pointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const velocity = performance.now() - current.time > 100 ? 0 : current.velocity;
    const coast = current.active ? Math.max(-135, Math.min(135, velocity * 0.16)) : 0;
    animateTo(Math.round((angle.current + coast) / anglePerSlide) * anglePerSlide);
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Leadership highlights" tabIndex={0}
      className="leadership-carousel relative w-full select-none rounded-[2rem] outline-none focus-visible:ring-4 focus-visible:ring-[#315fca]/30"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}
      onPointerCancel={cancelGesture} onLostPointerCapture={() => { if (gesture.current) cancelGesture(); }}
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        animateTo(Math.round(angle.current / anglePerSlide) * anglePerSlide + (event.key === 'ArrowLeft' ? anglePerSlide : -anglePerSlide));
      }}>
      <div ref={rotor} className="leadership-rotor absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%) rotateY(0deg)' }}>
        {leadershipSlides.map((slide, index) => <button key={slide.title} type="button" className="leadership-card absolute inset-0 block rounded-2xl p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#315fca]"
          aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={selected === index ? 'true' : undefined}
          style={{ transform: `rotateY(${index * anglePerSlide}deg) translateZ(var(--leadership-depth))` }}
          onClick={() => {
            if (didDrag.current) { didDrag.current = false; return; }
            const nearest = Math.round(angle.current / anglePerSlide) * anglePerSlide;
            const current = wrapIndex(Math.round(-nearest / anglePerSlide));
            animateTo(nearest - shortestOffset(index, current) * anglePerSlide);
          }}>
          <LeadershipCardContent slide={slide} index={index} />
          <span aria-hidden="true" className="leadership-card-back absolute inset-0 flex items-center justify-center rounded-2xl bg-[#e7eef9] p-12">
            <img src={slide.image.src} alt="" draggable={false} width={slide.image.width} height={slide.image.height} className="h-auto w-full object-contain" />
          </span>
        </button>)}
      </div>
      <p className="sr-only" aria-live={dragging || spinning ? 'off' : 'polite'}>Slide {selected + 1} of {leadershipSlides.length}: {leadershipSlides[selected].title}</p>
      <p className="sr-only">Swipe horizontally to rotate the cards, or use the left and right arrow keys. Scroll vertically to continue down the page.</p>
    </div>
  );
}
