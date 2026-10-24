import { researchExperience } from '@/lib/portfolio-content';

export function ResearchExperience() {
  return (
    <section id="research" aria-labelledby="research-heading" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 md:px-10 lg:px-14">
      <div data-scroll-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#747985]">Research in practice</p>
        <h2 id="research-heading" className="display-font mt-3 text-4xl italic sm:text-5xl">Research & development</h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {researchExperience.map((item) => <article key={item.title} data-scroll-reveal className="rounded-[2rem] border border-black/[0.07] bg-white/65 p-7 sm:p-9">
          <p className="mb-2 text-xs font-semibold leading-5 text-[#5c6d8c]">{item.role}<span className="block font-normal">{item.organization}</span></p>
          <h3 className="display-font text-3xl italic">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-[#676b75]">{item.text}</p>
        </article>)}
      </div>
    </section>
  );
}

export function EducationAndSkills() {
  const groups = [
    { name: 'Design & simulation', skills: ['CAD', 'Fusion 360', 'COMSOL', 'KiCad', 'Design iteration', 'Mechanical prototyping'] },
    { name: 'Code & analysis', skills: ['Python', 'MATLAB', 'LabVIEW', 'Excel', 'GitHub', 'AI-assisted development'] },
    { name: 'Research & collaboration', skills: ['User interviews', 'Survey design', 'Competitive analysis', 'Performance evaluation', 'Cross-functional communication', 'Project planning'] },
  ];
  return <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
    <article data-scroll-reveal className="rounded-[2rem] border border-black/[0.07] bg-[#e7f0ff]/65 p-7 sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5c6d8c]">Education</p>
      <h3 className="display-font mt-4 text-3xl italic">Bachelor of Science, Bioengineering</h3>
      <p className="mt-4 text-sm font-semibold text-[#5c6d8c]">Overall GPA: 3.67 · Dean’s List</p>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#747985]">Relevant coursework</p>
      <p className="mt-3 text-sm leading-7 text-[#676b75]">Biomechanics, Differential Equations, Fluid Mechanics, Statics, Physics, Signals and Sensors, and Statistics.</p>
    </article>
    <div className="space-y-7">
      {groups.map((group) => <div key={group.name} data-scroll-reveal>
        <h3 className="text-sm font-semibold text-[#343741]">{group.name}</h3>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={group.name}>
          {group.skills.map((skill) => <li key={skill} className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-2 text-xs text-[#676b75]">{skill}</li>)}
        </ul>
      </div>)}
    </div>
  </div>;
}
