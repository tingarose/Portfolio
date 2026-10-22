// Only assets whose contents match an existing project are included.
export const projectImages: Record<string, Array<{ src: string; alt: string; width: number; height: number }>> = {
  'Assistive wrist brace': [
    { src: '/projects/wrist-brace-render.webp', alt: 'CAD rendering of the wrist brace with straps and a utensil attachment', width: 1280, height: 960 },
    { src: '/projects/wrist-brace-prototype.webp', alt: 'Physical wrist-brace prototype being tested with a fork attachment', width: 1050, height: 1400 },
    { src: '/projects/wrist-brace-sketches.webp', alt: 'Concept sketches exploring wrist-brace attachment mechanisms', width: 844, height: 1600 },
  ],
  'Foot-controlled prosthetic': [
    { src: '/projects/foot-prosthetic-front.webp', alt: 'Front view of the foot-controlled grasping prosthetic prototype and finger linkages', width: 1050, height: 1400 },
    { src: '/projects/foot-prosthetic-side.webp', alt: 'Side view of the foot-controlled prosthetic prototype showing its mechanical linkages', width: 1050, height: 1400 },
  ],
  'Ball-and-socket prosthetic': [
    { src: '/projects/joint-prosthetic-assembly.webp', alt: 'Ball-and-socket prosthetic assembly shown on the CAD workspace grid', width: 1600, height: 703 },
    { src: '/projects/joint-prosthetic-cad.webp', alt: 'CAD assembly of the ball-and-socket joint prosthetic', width: 1600, height: 703 },
  ],
  '4-bit binary adder': [
    { src: '/projects/binary-adder-schematic.webp', alt: 'KiCad schematic of the four-bit binary adder with logic gates, switches, and LED outputs', width: 1072, height: 754 },
  ],
};
