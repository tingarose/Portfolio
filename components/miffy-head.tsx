'use client';

import { useEffect, useRef, useState } from 'react';
import fallback from '../images/bigivymiffy.png';

export function MiffyHead() {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.65, 8);
      camera.lookAt(0, 0.65, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xa4afc4, 2.6));
      const light = new THREE.DirectionalLight(0xfff4e9, 3.5);
      light.position.set(-3, 5, 6);
      scene.add(light);
      const fill = new THREE.DirectionalLight(0xc6dcff, 1.5);
      fill.position.set(4, 1, -2);
      scene.add(fill);

      const head = new THREE.Group();
      scene.add(head);
      const white = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.72 });
      const black = new THREE.MeshStandardMaterial({ color: 0x25242a, roughness: 0.85 });
      const sphere = new THREE.SphereGeometry(1, 48, 32);
      const stroke = new THREE.CapsuleGeometry(0.021, 0.19, 6, 12);
      const addOval = (x: number, y: number, z: number, sx: number, sy: number, sz: number, dark = false) => {
        const mesh = new THREE.Mesh(sphere, dark ? black : white);
        mesh.position.set(x, y, z);
        mesh.scale.set(sx, sy, sz);
        head.add(mesh);
        return mesh;
      };
      addOval(0, -0.15, 0, 1.07, 0.88, 0.78);
      addOval(-0.49, 1.05, -0.04, 0.29, 0.98, 0.3).rotation.z = 0.06;
      addOval(0.49, 1.05, -0.04, 0.29, 0.98, 0.3).rotation.z = -0.06;
      addOval(-0.39, -0.15, 0.729, 0.047, 0.058, 0.025, true);
      addOval(0.39, -0.15, 0.729, 0.047, 0.058, 0.025, true);
      for (const angle of [-Math.PI / 4, Math.PI / 4]) {
        const mouth = new THREE.Mesh(stroke, black);
        mouth.position.set(0, -0.46, 0.735);
        mouth.rotation.z = angle;
        head.add(mouth);
      }

      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const target = { x: 0, y: 0 };
      let frame = 0;
      let last = 0;
      let visible = true;
      const render = (now: number) => {
        frame = 0;
        if (!visible || document.hidden) return;
        const blend = 1 - Math.exp(-Math.min((now - last) / 1000, 0.05) * 7);
        last = now;
        head.rotation.x += (target.x - head.rotation.x) * blend;
        head.rotation.y += (target.y - head.rotation.y) * blend;
        renderer.render(scene, camera);
        if (Math.abs(target.x - head.rotation.x) + Math.abs(target.y - head.rotation.y) > 0.0001) {
          frame = requestAnimationFrame(render);
        }
      };
      const wake = () => { if (!frame) frame = requestAnimationFrame(render); };
      const reset = () => { target.x = 0; target.y = 0; wake(); };
      const move = (event: PointerEvent) => {
        if (preference.matches || event.pointerType === 'touch') return;
        const rect = host.getBoundingClientRect();
        target.y = THREE.MathUtils.clamp((event.clientX - rect.left - rect.width / 2) / (window.innerWidth / 2), -1, 1) * 0.48;
        target.x = THREE.MathUtils.clamp((event.clientY - rect.top - rect.height / 2) / (window.innerHeight / 2), -1, 1) * 0.28;
        wake();
      };
      const resize = new ResizeObserver(() => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        wake();
      });
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      });
      resize.observe(host);
      observer.observe(host);
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('blur', reset);
      document.documentElement.addEventListener('pointerleave', reset);
      document.addEventListener('visibilitychange', wake);
      preference.addEventListener('change', reset);
      setReady(true);
      wake();
      cleanup = () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        observer.disconnect();
        window.removeEventListener('pointermove', move);
        window.removeEventListener('blur', reset);
        document.documentElement.removeEventListener('pointerleave', reset);
        document.removeEventListener('visibilitychange', wake);
        preference.removeEventListener('change', reset);
        sphere.dispose();
        stroke.dispose();
        white.dispose();
        black.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => { /* Keep the illustration when WebGL is unavailable. */ });

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-6 top-16" role="img" aria-label="A 3D Miffy-style bunny head that gently looks toward your cursor">
      {!ready && <img src={fallback.src} alt="" className="absolute bottom-0 left-1/2 w-[86%] -translate-x-1/2" />}
      <div ref={container} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      {ready && <><div aria-hidden="true" className="pointer-events-none absolute bottom-[8%] left-1/2 h-4 w-32 -translate-x-1/2 rounded-[50%] bg-[#667b9e]/15 blur-md" /></>}
    </div>
  );
}
