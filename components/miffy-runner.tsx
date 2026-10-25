'use client';

import { useEffect, useRef, useState } from 'react';
import { pastries, pastryPalette } from './pastry-sprites';
import { starFrames, starPalette } from './star-sprites';

type Mode = 'ready' | 'running' | 'paused' | 'over';
type Obstacle = { x: number; width: number; height: number; pastry: number | null };

// Each cell is a pixel, drawn at an integer scale for crisp, original artwork.
const bunny = [
  '   ##    ##   ',
  '  #ww#  #ww#  ',
  '  #ww#  #ww#  ',
  '  #ww#  #ww#  ',
  '  #ww#  #ww#  ',
  '  #ww#  #ww#  ',
  '  #ww####ww#  ',
  ' #wwwwwwwwww# ',
  '#wwwwwwwwwwww#',
  '#wwwwwwwwwwww#',
  '#www#wwww#www#',
  '#wwwwwwwwwwww#',
  ' #wwww##wwww# ',
  '  #www##www#  ',
  '   ########   ',
  '  #pppppppp#  ',
  ' #wppppppppw# ',
  ' #wppppppppw# ',
  '  #pppppppp#  ',
  '  #pppppppp#  ',
  '   ########   ',
];

export function MiffyRunner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const action = useRef<() => void>(() => {});
  const jump = useRef<() => void>(() => {});
  const pause = useRef<() => void>(() => {});
  const duck = useRef(false);
  const muted = useRef(false);
  const enableAudio = useRef<() => void>(() => {});
  const [soundOn, setSoundOn] = useState(true);
  const [mode, setMode] = useState<Mode>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    let state: Mode = 'ready';
    let width = 800;
    let y = 0;
    let velocity = 0;
    let distance = 0;
    let record = 0;
    let elapsed = 0;
    let spawnIn = 1.7;
    let obstacles: Obstacle[] = [];
    let pastryBag: number[] = [];
    let frame = 0;
    let previous = 0;
    let shownScore = 0;
    let spawnCount = 0;
    let wasCrouching = false;
    let audio: AudioContext | null = null;
    const unlockAudio = () => {
      if (muted.current) return;
      try {
        audio ??= new AudioContext();
        if (audio.state === 'suspended') void audio.resume().catch(() => {});
      } catch { /* The game also works without audio support. */ }
    };
    const playSound = (kind: 'jump' | 'duck') => {
      if (muted.current || !audio || audio.state !== 'running') return;
      const oscillator = audio.createOscillator();
      const volume = audio.createGain();
      const now = audio.currentTime;
      const duration = kind === 'jump' ? 0.14 : 0.11;
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(kind === 'jump' ? 380 : 240, now);
      oscillator.frequency.exponentialRampToValueAtTime(kind === 'jump' ? 850 : 95, now + duration);
      volume.gain.setValueAtTime(0, now);
      volume.gain.linearRampToValueAtTime(0.1, now + 0.008);
      volume.gain.exponentialRampToValueAtTime(0.001, now + duration);
      oscillator.connect(volume);
      volume.connect(audio.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.015);
      oscillator.onended = () => { oscillator.disconnect(); volume.disconnect(); };
    };
    enableAudio.current = unlockAudio;
    const ground = 206;
    const playerX = 64;
    try { record = Math.max(0, Number(localStorage.getItem('ivy-miffy-best')) || 0); } catch { /* Storage is optional. */ }
    setBest(record);
    const change = (next: Mode) => { state = next; setMode(next); };
    const rect = (x: number, yy: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(yy), w, h);
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, 248);
      ctx.fillStyle = '#f7f6f2';
      ctx.fillRect(0, 0, width, 248);
      // A quiet pixel landscape; movement happens only during play.
      for (let i = 0; i < 5; i++) {
        const x = ((i * 211 + 100 - distance * 0.15) % (width + 120) + width + 120) % (width + 120) - 60;
        rect(x, 50 + (i % 2) * 25, 54, 9, '#ffffff');
        rect(x + 12, 41 + (i % 2) * 25, 27, 9, '#ffffff');
      }
      rect(0, ground, width, 1, '#c9c8c4');
      for (let i = 0; i < width / 32 + 2; i++) {
        rect(i * 32 - (distance % 32), ground + 13 + (i % 3) * 7, 4, 1, '#deddd8');
      }
      const crouching = duck.current && y === 0;
      ctx.save();
      if (crouching) {
        ctx.translate(0, ground * 0.5);
        ctx.scale(1, 0.5);
      }
      const top = ground - 72 - y;
      const colors: Record<string, string> = { '#': '#343a36', w: '#fffdf4', p: '#e8a6b6' };
      bunny.forEach((row, rowIndex) => [...row].forEach((cell, col) => {
        if (colors[cell]) rect(playerX + col * 3, top + rowIndex * 3, 3, 3, colors[cell]);
      }));
      rect(playerX + 15, top + 36, 12, 6, '#fffdf4');
      for (const [px, py] of [[17, 36], [23, 36], [20, 39], [17, 42], [23, 42]]) {
        rect(playerX + px, top + py, 2, 2, '#343a36');
      }
      const step = state === 'running' && y === 0 ? Math.floor(elapsed * 10) % 2 : 0;
      rect(playerX + 9, top + 63, 12, step ? 6 : 9, '#343a36');
      rect(playerX + 24, top + 63, 12, step ? 9 : 6, '#343a36');
      rect(playerX + 12, top + 63, 6, step ? 3 : 6, '#fffdf4');
      rect(playerX + 27, top + 63, 6, step ? 6 : 3, '#fffdf4');
      ctx.restore();
      for (const obstacle of obstacles) {
        if (obstacle.pastry === null) {
          const pixels = starFrames[Math.floor(elapsed * 2.4 / (Math.PI * 2) * starFrames.length) % starFrames.length];
          pixels.forEach((row, rowIndex) => [...row].forEach((pixel, column) => {
            const color = starPalette[pixel];
            if (color) rect(obstacle.x + column * 3, ground - 84 + rowIndex * 3, 3, 3, color);
          }));
          continue;
        }
        const sprite = pastries[obstacle.pastry];
        const topY = ground - obstacle.height;
        sprite.pixels.forEach((row, rowIndex) => [...row].forEach((pixel, column) => {
          const color = pastryPalette[pixel];
          if (color) rect(obstacle.x + column * 3, topY + rowIndex * 3, 3, 3, color);
        }));
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (state !== 'running') return;
      const dt = previous === 0 ? 0 : Math.max(0, Math.min((now - previous) / 1000, 0.033));
      previous = now;
      elapsed += dt;
      // Build speed throughout longer runs, easing toward a playable maximum.
      const speed = 210 + 270 * (1 - Math.exp(-elapsed / 70));
      distance += speed * dt;
      y = Math.max(0, y + velocity * dt);
      velocity -= 1600 * dt;
      if (y === 0 && velocity < 0) velocity = 0;
      const crouching = duck.current && y === 0;
      if (crouching && !wasCrouching) playSound('duck');
      wasCrouching = crouching;
      spawnIn -= dt;
      if (spawnIn <= 0) {
        // Introduce a star second, then mix them between the pastry obstacles.
        const isStar = spawnCount === 1 || (spawnCount > 1 && Math.random() < 0.35);
        spawnCount++;
        if (isStar) {
          obstacles.push({ x: width + 30, width: 36, height: 36, pastry: null });
        } else {
        if (pastryBag.length === 0) {
          pastryBag = pastries.map((_, index) => index);
          for (let i = pastryBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pastryBag[i], pastryBag[j]] = [pastryBag[j], pastryBag[i]];
          }
        }
        const pastry = pastryBag.pop()!;
        const sprite = pastries[pastry];
        obstacles.push({ x: width + 30, width: Math.max(...sprite.pixels.map((row) => row.length)) * 3, height: sprite.pixels.length * 3, pastry });
        }
        spawnIn = 1.35 + Math.random() * 0.65;
      }
      obstacles.forEach((obstacle) => { obstacle.x -= speed * dt; });
      obstacles = obstacles.filter((obstacle) => obstacle.x > -50);
      const playerHeight = duck.current && y === 0 ? 36 : 72;
      const hit = obstacles.some((o) => {
        if (playerX + 33 <= o.x + 3 || playerX + 9 >= o.x + o.width - 3) return false;
        const obstacleTop = o.pastry === null ? ground - 81 : ground - o.height + 4;
        const obstacleBottom = o.pastry === null ? ground - 51 : ground;
        return ground - y - 5 > obstacleTop && ground - y - playerHeight + 4 < obstacleBottom;
      });
      const points = Math.floor(distance / 20);
      if (points !== shownScore) { shownScore = points; setScore(points); }
      if (hit) {
        change('over');
        if (points > record) {
          record = points;
          setBest(record);
          try { localStorage.setItem('ivy-miffy-best', String(record)); } catch { /* Storage is optional. */ }
        }
      }
      draw();
      if (state === 'running') frame = requestAnimationFrame(tick);
    };
    action.current = () => {
      unlockAudio();
      if (state === 'ready' || state === 'over') {
        duck.current = false;
        wasCrouching = false;
        spawnCount = 0;
        y = 0; velocity = 0; distance = 0; elapsed = 0; spawnIn = 1.7; obstacles = []; shownScore = 0;
        setScore(0);
        change('running');
        previous = 0;
        frame = requestAnimationFrame(tick);
      } else if (state === 'paused') {
        change('running');
        previous = 0;
        frame = requestAnimationFrame(tick);
      } else if (y === 0 && !duck.current && velocity === 0) {
        velocity = 610;
        playSound('jump');
      }
    };
    jump.current = () => {
      duck.current = false;
      if (state !== 'running') action.current();
      if (y === 0 && velocity === 0) {
        velocity = 610;
        playSound('jump');
      }
    };
    pause.current = () => {
      duck.current = false;
      wasCrouching = false;
      if (state !== 'running') return;
      cancelAnimationFrame(frame);
      change('paused');
      draw();
    };
    const visibility = () => { if (document.hidden) pause.current(); };
    const releaseDuck = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') duck.current = false;
    };
    const resize = new ResizeObserver(() => {
      width = Math.max(360, Math.round(element.getBoundingClientRect().width));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = 248 * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.imageSmoothingEnabled = false;
      draw();
    });
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause.current(); });
    resize.observe(element);
    observer.observe(element);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', pause.current);
    window.addEventListener('keyup', releaseDuck);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', pause.current);
      window.removeEventListener('keyup', releaseDuck);
      duck.current = false;
      action.current = () => {};
      jump.current = () => {};
      pause.current = () => {};
      enableAudio.current = () => {};
      if (audio) void audio.close().catch(() => {});
    };
  }, []);

  return (
    <section aria-labelledby="miffy-runner-title" className="miffy-runner mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10 lg:px-14">
      <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[#f7f6f2]">
        <div className="flex flex-wrap items-end justify-between gap-5 px-6 pb-3 pt-7 sm:px-8">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#747985]">A tiny study break</p>
            <h2 id="miffy-runner-title" className="display-font mt-2 text-4xl italic">Miffy, on the run.</h2>
          </div>
          <div className="flex gap-6 font-mono text-xs text-[#5c6d8c]" aria-label={`Score ${score}, best ${best}`}>
            <span>SCORE <strong className="ml-1">{String(score).padStart(4, '0')}</strong></span>
            <span>BEST <strong className="ml-1">{String(best).padStart(4, '0')}</strong></span>
          </div>
        </div>
        <div className="relative">
          <canvas
            ref={canvas}
            tabIndex={0}
            role="button"
            aria-label="Miffy runner. Space or Up to start or jump. Hold Down or S to duck under stars. Escape pauses."
            className="block h-[248px] w-full cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#315fca]"
            onPointerDown={(event) => { event.currentTarget.focus({ preventScroll: true }); action.current(); }}
            onKeyDown={(event) => {
              if ([' ', 'ArrowUp', 'Enter'].includes(event.key)) {
                event.preventDefault();
                if (!event.repeat) action.current();
              } else if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
                event.preventDefault();
                duck.current = mode === 'running';
              } else if (event.key === 'Escape') pause.current();
            }}
            onBlur={(event) => {
              duck.current = false;
              // A touch release can blur the canvas without moving focus elsewhere.
              // Window blur and visibility changes handle leaving the browser.
              if (event.relatedTarget && !event.currentTarget.closest('section')?.contains(event.relatedTarget)) pause.current();
            }}
          >Jump over pastries with Space or tap. Hold Down or S to duck under spinning stars.</canvas>
          {mode !== 'running' && <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-10 pl-20">
            <div className="rounded-2xl border border-white/80 bg-[#f7f6f2]/95 px-5 py-4 text-center shadow-sm">
              <p aria-live="polite" className="text-sm font-semibold text-[#343741]">{mode === 'over' ? `Nice run! ${score} points.` : mode === 'paused' ? 'Taking a breather.' : 'Little bunny. Big adventure.'}</p>
              <p className="mt-2 text-xs text-[#737681]">{mode === 'over' ? 'Tap to try again' : mode === 'paused' ? 'Tap to resume' : 'Tap or press Space to play'}</p>
            </div>
          </div>}
        </div>
        <div className="runner-controls flex flex-wrap items-center justify-between gap-3 px-6 pb-6 sm:px-8">
          <p className="text-xs leading-5 text-[#737681]"><span className="md:hidden">Tap Jump to jump. Hold Duck to crouch under stars.</span><span className="hidden md:inline">Space / ↑ / tap: jump pastries · hold ↓ / S: duck under stars</span></p>
          <div className="runner-actions flex flex-wrap items-center gap-2">
          <button type="button" aria-label="Start game or jump" className="runner-jump md:hidden touch-manipulation select-none rounded-full border border-[#8498bd]/40 bg-[#e4ecfa] px-4 py-3 text-sm font-semibold text-[#345076]"
            onPointerDown={(event) => { event.preventDefault(); jump.current(); }}
            onClick={(event) => { if (event.detail === 0) jump.current(); }}
          >Jump ↑</button>
          <button type="button" aria-pressed={soundOn} aria-label={soundOn ? 'Mute game sounds' : 'Enable game sounds'}
            onClick={() => {
              muted.current = !muted.current;
              setSoundOn(!muted.current);
              if (!muted.current) enableAudio.current();
            }}
            className="runner-sound rounded-full border border-[#8498bd]/30 bg-white/65 px-4 py-2 text-xs font-semibold text-[#5c6d8c] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#315fca]"
          >Sound {soundOn ? 'on' : 'off'}</button>
          <button type="button" aria-label="Hold to duck under stars"
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.focus({ preventScroll: true });
              if (mode !== 'running') action.current();
              event.currentTarget.setPointerCapture(event.pointerId);
              duck.current = true;
            }}
            onPointerUp={() => { duck.current = false; }}
            onPointerCancel={() => { duck.current = false; }}
            onLostPointerCapture={() => { duck.current = false; }}
            onKeyDown={(event) => {
              if ([' ', 'Enter', 'ArrowDown', 's', 'S'].includes(event.key)) {
                event.preventDefault();
                if (mode !== 'running') action.current();
                duck.current = true;
              }
            }}
            onKeyUp={() => { duck.current = false; }}
            onBlur={() => { duck.current = false; }}
            className="runner-duck touch-none select-none rounded-full border border-[#8498bd]/30 bg-white/65 px-4 py-2 text-xs font-semibold text-[#5c6d8c] active:bg-[#e9e8e4] disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#315fca]"
          >Hold to duck ↓</button>
          <button type="button" onClick={() => {
            if (mode === 'running') pause.current();
            else { canvas.current?.focus({ preventScroll: true }); action.current(); }
          }} className="runner-toggle rounded-full border border-[#8498bd]/30 bg-white/65 px-4 py-2 text-xs font-semibold text-[#5c6d8c] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fca]">
            {mode === 'running' ? 'Pause' : mode === 'paused' ? 'Resume' : mode === 'over' ? 'Play again' : 'Let’s play'}
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}



