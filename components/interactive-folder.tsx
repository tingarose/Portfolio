'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createRoundedSheetGeometry(width: number, height: number, radius: number) {
  const left = -width / 2;
  const bottom = -height / 2;
  const right = width / 2;
  const top = height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(left + radius, bottom);
  shape.lineTo(right - radius, bottom);
  shape.quadraticCurveTo(right, bottom, right, bottom + radius);
  shape.lineTo(right, top - radius);
  shape.quadraticCurveTo(right, top, right - radius, top);
  shape.lineTo(left + radius, top);
  shape.quadraticCurveTo(left, top, left, top - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);

  const geometry = new THREE.ShapeGeometry(shape, 16);
  const positions = geometry.getAttribute('position');
  const uvs = geometry.getAttribute('uv');

  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(
      index,
      (positions.getX(index) + width / 2) / width,
      (positions.getY(index) + height / 2) / height,
    );
  }

  uvs.needsUpdate = true;
  return geometry;
}

function useCoverTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1280;

    const context = canvas.getContext('2d');
    if (!context) return null;

    context.fillStyle = '#315fca';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = 'italic 700 86px Arial, sans-serif';
    context.fillText('More', canvas.width / 2, 575);
    context.fillText('about me', canvas.width / 2, 685);

    const coverTexture = new THREE.CanvasTexture(canvas);
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    coverTexture.anisotropy = 4;
    return coverTexture;
  }, []);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function usePaperTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1280;

    const context = canvas.getContext('2d');
    if (!context) return null;

    context.fillStyle = '#fffaf5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(930, canvas.height / 2);
    context.rotate(Math.PI / 2);
    context.fillStyle = '#343434';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '600 52px Arial, sans-serif';
    context.fillText("i don't know", 0, 0);
    context.restore();

    const paperTexture = new THREE.CanvasTexture(canvas);
    paperTexture.colorSpace = THREE.SRGBColorSpace;
    paperTexture.anisotropy = 4;
    return paperTexture;
  }, []);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function FolderSheets({ open }: { open: boolean }) {
  const frontCover = useRef<THREE.Group>(null);
  const paper = useRef<THREE.Mesh>(null);
  const coverTexture = useCoverTexture();
  const paperTexture = usePaperTexture();
  const folderGeometry = useMemo(
    () => createRoundedSheetGeometry(3.15, 3.95, 0.2),
    [],
  );
  const paperGeometry = useMemo(
    () => createRoundedSheetGeometry(2.8, 3.55, 0.15),
    [],
  );

  useEffect(
    () => () => {
      folderGeometry.dispose();
      paperGeometry.dispose();
    },
    [folderGeometry, paperGeometry],
  );

  useFrame((_, delta) => {
    if (frontCover.current) {
      frontCover.current.rotation.y = THREE.MathUtils.damp(
        frontCover.current.rotation.y,
        open ? -0.54 : 0,
        6,
        delta,
      );
    }

    if (paper.current) {
      paper.current.position.x = THREE.MathUtils.damp(
        paper.current.position.x,
        open ? 0.72 : 0,
        5,
        delta,
      );
    }
  });

  return (
    <group rotation={[0, 0, 0]} scale={0.92}>
      <mesh geometry={folderGeometry} position={[0, 0, -0.08]}>
        <meshStandardMaterial color="#2354b8" side={THREE.DoubleSide} roughness={0.5} />
      </mesh>

      <mesh
        ref={paper}
        geometry={paperGeometry}
        position={[0, 0, -0.015]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={paperTexture ? '#ffffff' : '#fffaf5'}
          map={paperTexture ?? undefined}
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>

      <group ref={frontCover} position={[-1.575, 0, 0.025]} rotation={[0, 0, 0]}>
        <mesh geometry={folderGeometry} position={[1.575, 0, 0]}>
          <meshStandardMaterial
          color={coverTexture ? '#ffffff' : '#315fca'}
            map={coverTexture ?? undefined}
            side={THREE.DoubleSide}
            roughness={0.42}
          />
        </mesh>
      </group>
    </group>
  );
}

export function InteractiveFolder() {
  const [open, setOpen] = useState(false);

  return (
    <div
      role="img"
      tabIndex={0}
      aria-label="Interactive blue 3D folder labeled More about me; hover or focus to open it"
      className="h-[24rem] w-full max-w-xl cursor-pointer rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#315fca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#ebeae5] sm:h-[28rem]"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((current) => !current)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setOpen((current) => !current);
        }
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 100 }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 6]} intensity={2.4} />
        <FolderSheets open={open} />
      </Canvas>
    </div>
  );
}
