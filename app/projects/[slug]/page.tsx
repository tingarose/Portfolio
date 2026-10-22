import { notFound } from 'next/navigation';
import { projectDetails } from '@/lib/portfolio-content';
import { projectImages } from '@/lib/project-images';

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);
  return { title: project ? `${project.title} — Ivy Lee` : 'Project not found', description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);
  if (!project) notFound();
  const images = projectImages[project.title] ?? [];
  const next = projectDetails[(projectDetails.indexOf(project) + 1) % projectDetails.length];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
      <nav aria-label="Project navigation" className="flex items-center justify-between border-b border-black/10 pb-6 text-sm text-[#5c6d8c]">
        <a href="/#engineering" className="hover:underline underline-offset-4">← Back to projects</a>
        <a href="/" className="display-font text-xl italic text-[#343741]">Ivy Lee</a>
      </nav>
      <header className="max-w-3xl py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#747985]">Engineering · Selected work</p>
        <h1 className="display-font mt-5 text-5xl italic leading-[1.05] tracking-[-0.04em] sm:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#676b75]">{project.summary}</p>
      </header>

      {project.slug === 'infantlift' && <section aria-label="InfantLift demonstration" className="overflow-hidden rounded-[2rem] bg-[#22242a]">
        <video controls playsInline preload="none" aria-label="InfantLift demonstration video" className="aspect-video w-full">
          <source src="/projects/infantlift-demo.mp4" type="video/mp4" />
          <a href="/projects/infantlift-demo.mp4">Open the InfantLift demonstration video</a>
        </video>
      </section>}

      {images.length > 0 && <section aria-label={`${project.title} gallery`} className="space-y-8">
        {images.map((image, index) => <figure key={image.src} className="overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white/75 p-4 sm:p-7">
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`View full image: ${image.alt} (opens in a new tab)`}>
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index === 0 ? 'eager' : 'lazy'} className="max-h-[38rem] w-full rounded-xl object-contain" />
          </a>
          <figcaption className="mt-4 flex gap-4 text-sm leading-6 text-[#737681]"><span className="font-mono text-[#8498bd]">{String(index + 1).padStart(2, '0')}</span>{image.alt}</figcaption>
        </figure>)}
      </section>}

      <section aria-labelledby="process-heading" className="my-14 grid gap-8 rounded-[2rem] border border-black/[0.07] bg-white/65 p-7 sm:p-10 md:grid-cols-[0.65fr_1.35fr]">
        <h2 id="process-heading" className="display-font text-4xl italic">Design & process</h2>
        <ul className="space-y-6">
          {project.details.map((detail, index) => <li key={detail} className="flex gap-4 text-base leading-7 text-[#676b75]"><span className="pt-1 font-mono text-xs text-[#8498bd]">{String(index + 1).padStart(2, '0')}</span><span>{detail}</span></li>)}
        </ul>
      </section>
      <footer className="flex flex-wrap justify-between gap-5 border-t border-black/10 pt-7 text-sm text-[#5c6d8c]">
        <a href="/#engineering" className="hover:underline">← All projects</a>
        <a href={`/projects/${next.slug}`} className="hover:underline">Next: {next.title} →</a>
      </footer>
    </main>
  );
}
