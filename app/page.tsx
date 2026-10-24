import headerLeftMiffy from '../images/headerleftmiffy.png';
import headerRightMiffy from '../images/headerrightmiffy.png';
import ivyMiffy from '../images/ivymiffy.png';
import { MiffyHead } from '@/components/miffy-head';
import { MiffyRunner } from '@/components/miffy-runner';
import { ScrollMotion } from '@/components/scroll-motion';
import { EducationAndSkills, ResearchExperience } from '@/components/portfolio-experience';
import { projectDetails } from '@/lib/portfolio-content';
import { projectImages } from '@/lib/project-images';
import technicalMiffyOne from '../images/technicalmiffy1.png';
import technicalMiffyTwo from '../images/technicalmiffy2.png';
import technicalMiffyThree from '../images/technicalmiffy3.png';
import dinosaurMiffy from '../images/dinosaurmiffy.png';
import peekingMiffy from '../images/peekingmiffy.png';
import {
  ArrowDownRightIcon,
  FileTextIcon,
  MoveHorizontalIcon,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';
import { AboutSection } from '@/components/about-section';
import { EngineeringProjectCard } from '@/components/engineering-project-card';
import { InteractiveFolder } from '@/components/interactive-folder';
import { LeadershipHighlights } from '@/components/leadership-highlights';
import { TypewriterText } from '@/components/typewriter-text';

const miffyAscii = String.raw`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠋⠉⠳⡄⠀⠀⠀⠀⢠⠴⠒⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡶⢶⡀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⢹⡄⠀⠀⣰⠋⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣀⡼⠀⠀⠛⠒⠒⡦⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⣷⠀⢰⡏⠀⠀⠀⠀⠀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣏⠁⠀⠀⠀⠀⠀⣼⠁⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⣹⠀⢸⠀⠀⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠉⡶⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⢽⠀⢸⠀⠀⠀⠀⠀⠀⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢷⡤⠞⠉⠉⠉⠁⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⢸⡆⢸⠀⠀⠀⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠈⠛⠋⠀⠀⢀⠄⡀⣸⠃⡀⠠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠀⠀⠠⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠲⢀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠁⠀⠜⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠠⠳⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣠⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠒⠀⠀⠀⠀⠀⣰⠀⠐⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⠁⠈⣧⠀⠰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣄⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⡇⠀⠘⠁⠀⠘⠲⢤⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢦⣄⠀⣠⠤⠤⠄⠙⡇⠀⠀⢨⠷⢶⡋⠀⠀⠀⠀⠀⢀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⢷⣀⡴⠂⢠⣇⡀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⠤⣤⣤⡴⠋⠀⠹⣽⣛⣛⣿⠋⠉⠉⢁⡴⢋⣳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⡀⠀⠀⠉⠁⠀⠀⠀⣠⡞⠓⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡍⠓⠦⢤⠤⠴⠶⣺⠟⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⡰⢲⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠒⠛⠲⠶⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⠉⠁⠈⠲⣤
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⣀⡀⠀⡞⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠈⠙⠁⠀`;

const projectIllustrations = [
  {
    image: technicalMiffyOne,
    alt: 'Miffy working with laboratory glassware',
    imageBackground: 'bg-[#dceaff]',
  },
  {
    image: technicalMiffyTwo,
    alt: 'Miffy holding laboratory glassware',
    imageBackground: 'bg-[#eee5fa]',
  },
  {
    image: technicalMiffyThree,
    alt: 'Miffy reading a book',
    imageBackground: 'bg-[#f8e5ea]',
  },
];

const engineeringProjects = projectDetails.map((project, index) => ({
  ...projectIllustrations[index % projectIllustrations.length],
  ...project,
}));

// Replace these URLs whenever you want to update your social profiles or résumé.
const socialNavItems = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ivy-lee13',
    Icon: FaLinkedin,
  },
  { label: 'Résumé', href: '/resume.pdf', Icon: FileTextIcon },
];

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#engineering' },
  { label: 'Growth', href: '#product-growth' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#technical-skills' },
];

export default function Home() {
  return (
    <>
      <ScrollMotion />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.07] bg-[#f7f6f2]/90 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12"
        >
          <a
            href="#top"
            aria-label="Back to the top"
            className="flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]"
          >
            <img
              src={headerLeftMiffy.src}
              alt=""
              aria-hidden="true"
              width={headerLeftMiffy.width}
              height={headerLeftMiffy.height}
              className="h-11 w-auto object-contain"
            />
            <span className="display-font hidden text-lg italic sm:inline">Ivy Lee</span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-[#575b66] md:flex">
            {sectionLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#22242a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            {socialNavItems.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label}`}
                title={label}
                className="flex size-8 items-center justify-center rounded-full text-[#555963] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#22242a] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fca] sm:size-9"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
            <img
              src={headerRightMiffy.src}
              alt=""
              aria-hidden="true"
              width={headerRightMiffy.width}
              height={headerRightMiffy.height}
              className="ml-1 h-10 w-auto object-contain sm:ml-2 sm:h-11"
            />
          </div>
        </nav>
      </header>

      <main id="top" className="overflow-x-clip pt-16">
        <section id="hero" className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:gap-20 lg:px-14">
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 inline-flex items-center rounded-full border border-black/10 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#666a75] shadow-sm backdrop-blur">
              Engineer · builder · human
            </p>
            <h1 className="display-font text-[clamp(3.75rem,8vw,7.25rem)] font-normal italic leading-[0.88] tracking-[-0.055em] text-[#202228]">
              Hi, I&apos;m Ivy.
            </h1>
            <div className="mt-7 flex items-center gap-3 text-[#343741]">
              <span className="h-px w-8 bg-[#315fca]" aria-hidden="true" />
              <TypewriterText />
            </div>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#676b75] sm:text-lg">
              Designing medical devices, exploring product ideas, and turning
              user needs into thoughtful, tested solutions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#engineering"
                className="inline-flex items-center gap-2 rounded-full bg-[#22242a] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(34,36,42,0.18)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]"
              >
                See my work
                <ArrowDownRightIcon className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-semibold text-[#343741] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]"
              >
                About me
              </a>
            </div>
          </div>

          <div data-scroll-depth="0.08" className="hero-art relative mx-auto w-full max-w-[35rem]">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[3rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(208,226,255,0.78))] shadow-[0_35px_90px_rgba(72,91,128,0.18)]">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#646b79] sm:inset-x-8 sm:top-8">
                <span>Portfolio</span>
                <span>2026</span>
              </div>
              <MiffyHead />
            </div>
            <div data-scroll-depth="-0.13" className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-3 pr-5 shadow-[0_18px_50px_rgba(71,77,95,0.16)] backdrop-blur sm:-left-10 sm:p-4 sm:pr-6">
              <img
                src={ivyMiffy.src}
                alt="Ivy Miffy peeking over a starry blanket"
                width={ivyMiffy.width}
                height={ivyMiffy.height}
                className="h-auto w-16 sm:w-20"
              />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#7a7e88]">currently</p>
                <p className="display-font mt-1 text-base italic sm:text-lg">making things happen</p>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />

        <section
          id="engineering"
          aria-labelledby="engineering-heading"
          className="scroll-chapter mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        >
          <div data-scroll-reveal className="flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747985]">01 · Selected work</p>
              <h2
                id="engineering-heading"
                className="display-font mt-3 text-5xl font-normal italic tracking-[-0.04em] sm:text-6xl"
              >
                Engineering
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#737681] sm:text-right">
              Experiments, technical projects, and the ideas behind them.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_2.28fr]">
            <aside className="relative hidden min-h-[25rem] overflow-hidden rounded-[2rem] border border-black/[0.07] bg-[#e7f0ff]/75 p-6 lg:flex lg:items-center lg:justify-center">
              <span className="absolute left-6 top-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#6c7484]">A tiny mascot</span>
              <pre
                role="img"
                aria-label="Miffy holding flowers drawn with text characters"
                className="max-w-full overflow-hidden font-mono text-[0.29rem] leading-[1.04] text-[#36425d]/80 xl:text-[0.34rem]"
              >
                {miffyAscii}
              </pre>
            </aside>

            <div className="engineering-gallery">
              {engineeringProjects.map((project) => (
                <EngineeringProjectCard
                  key={project.title}
                  title={project.title}
                  summary={project.summary}
                  href={`/projects/${project.slug}`}
                  imageSrc={project.image.src}
                  imageWidth={project.image.width}
                  imageHeight={project.image.height}
                  alt={project.alt}
                  imageBackground={projectImages[project.title] ? 'bg-[#f2f1ee]' : project.imageBackground}
                  gallery={projectImages[project.title]}
                  videoSrc={project.title === 'InfantLift' ? '/projects/infantlift-demo.mp4' : undefined}
                  videoPoster={project.title === 'InfantLift' ? '/projects/infantlift-cover.jpg' : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <ResearchExperience />

        <section
          id="product-growth"
          aria-labelledby="product-growth-heading"
          className="scroll-chapter mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        >
          <div data-scroll-reveal className="flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747985]">02 · Product thinking</p>
              <h2
                id="product-growth-heading"
                className="display-font mt-3 text-5xl font-normal italic tracking-[-0.04em] sm:text-6xl"
              >
                Product / Growth
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#737681] sm:text-right">
              Strategy, research, and experiments designed around real people.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="group overflow-hidden rounded-[2.25rem] border border-black/[0.07] bg-white/70 p-5 shadow-[0_20px_60px_rgba(73,78,94,0.08)] backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#f2e1e7] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7a5966]">PM</span>
                <span className="text-xs text-[#838690]">Featured study</span>
              </div>
              <div className="relative mt-6 grid min-h-[25rem] items-center gap-6 overflow-hidden rounded-[1.75rem] bg-[#f6dfe5] px-6 pt-8 sm:grid-cols-[0.9fr_1.1fr] sm:px-10">
                <div className="self-center pb-8">
                  <h3 className="display-font text-4xl italic tracking-[-0.03em] sm:text-5xl">Learning, made engaging.</h3>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-[#6e6267]">Researched streaks, stats, and gamification across 3+ core experiences, translating student pain points into features and UX recommendations.</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#75686d]">User surveys · product research · UX</p>
                  <a href="/growth" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6e4f5d] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#533b46] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]">Explore my growth work <span aria-hidden="true">↗</span></a>
                </div>
                <img
                  data-scroll-depth="-0.05" src={dinosaurMiffy.src}
                  alt="Miffy wearing headphones"
                  width={dinosaurMiffy.width}
                  height={dinosaurMiffy.height}
                  className="mx-auto mt-auto h-auto max-h-[22rem] w-full object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                />
                <a href="https://www.tiktok.com/@ivytings" target="_blank" rel="noopener noreferrer" aria-label="View Ivy’s TikTok (opens in a new tab)" title="TikTok" className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full text-[#75686d] transition-colors hover:bg-white/60 hover:text-[#343741] focus-visible:outline-2 focus-visible:outline-[#315fca]"><SiTiktok aria-hidden="true" className="size-4" /></a>
              </div>
            </article>

            <div className="grid gap-5">
              <article className="rounded-[2.25rem] border border-black/[0.07] bg-[#dceaff]/75 p-7 shadow-[0_20px_60px_rgba(73,78,94,0.07)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#5c6d8c]">Research</p>
                <h3 className="display-font mt-10 text-4xl italic tracking-[-0.03em]">Listen. Compare. Iterate.</h3>
                <p className="mt-4 text-sm leading-6 text-[#62708a]">Designed surveys testing four product/UI variants and translated qualitative feedback into design iterations. Analyzed 10+ productivity and education platforms to identify patterns in onboarding, gamification, premium conversion, and retention.</p>
              </article>

              <article className="relative min-h-[17rem] overflow-hidden rounded-[2.25rem] border border-black/[0.07] bg-white/70 p-7 shadow-[0_20px_60px_rgba(73,78,94,0.07)]">
                <p className="relative z-10 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#747985]">Growth</p>
                <h3 className="display-font relative z-10 mt-5 text-4xl italic tracking-[-0.03em]">A plan for growth.</h3>
                <p className="relative z-10 mt-4 pb-36 text-sm leading-6 text-[#676b75]">Quickly learned marketing and growth while creating around 30 videos for Wick. Developed scripting, short-form storytelling, editing, and audience research skills alongside a 13-week back-to-school content plan.</p>
                <img
                  data-scroll-depth="-0.035" src={peekingMiffy.src}
                  alt="Miffy peeking into the growth card"
                  width={peekingMiffy.width}
                  height={peekingMiffy.height}
                  className="absolute -bottom-2 right-1 h-auto w-40 sm:w-48"
                />
              </article>
            </div>
          </div>
        </section>

        <section
          id="leadership"
          aria-labelledby="leadership-heading"
          className="scroll-chapter mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        >
          <div className="rounded-[2.75rem] border border-black/[0.07] bg-white/55 px-4 py-9 shadow-[0_30px_90px_rgba(73,78,94,0.09)] backdrop-blur sm:px-8 sm:py-12 lg:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747985]">03 · People & teams</p>
                <h2
                  id="leadership-heading"
                  className="display-font mt-3 text-5xl font-normal italic tracking-[-0.04em] sm:text-6xl"
                >
                  Leadership
                </h2>
              </div>
              <p className="flex items-center gap-2 text-sm text-[#737681]">
                <MoveHorizontalIcon className="size-4" aria-hidden="true" />
                Choose a role to explore
              </p>
            </div>
            <div className="mt-3">
              <LeadershipHighlights />
            </div>

          </div>
        </section>

        <section
          id="technical-skills"
          aria-labelledby="technical-skills-heading"
          className="mx-auto min-h-[28rem] w-full max-w-7xl scroll-mt-20 px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747985]">04 · Toolkit</p>
          <h2
            id="technical-skills-heading"
            className="display-font mt-3 text-5xl font-normal italic tracking-[-0.04em] sm:text-6xl"
          >
            Education & skills
          </h2>
          <EducationAndSkills />
        </section>
      </main>

      <footer className="portfolio-footer border-t border-black/[0.07] bg-[#ebeae5]">
        <div className="footer-overview mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-6 md:px-10">
          <div className="footer-copy">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#74766f]">One more thing</p>
            <h2 className="display-font mt-4 text-5xl italic tracking-[-0.04em] sm:text-6xl">More about me</h2>
            <p className="mt-5 text-sm leading-6 text-[#70726d]">I’m involved in WE Lead (Women’s Entrepreneurial Leadership Program), BMES, and Bioengage. I also studied abroad with Engineering Japan in summer 2024 and volunteered at Kaiser Permanente Capitol Hill in 2023.</p>

            <p className="mt-5 text-sm leading-7 text-[#70726d]">Away from projects, you’ll find me painting, playing video games or board games, cooking, singing, or on the pickleball court.</p>
          </div>
          <div className="footer-folder flex justify-center">
            <InteractiveFolder />
          </div>
        </div>
        <details className="footer-game mx-auto max-w-6xl border-t border-black/10">
          <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-[#5c6d8c] focus-visible:outline-2 focus-visible:outline-[#315fca] md:px-10">A little extra: play the Miffy mini-game</summary>
          <MiffyRunner />
        </details>
      </footer>
    </>
  );
}


