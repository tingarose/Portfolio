import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product & Growth — Ivy Lee',
  description: 'Selected short-form videos, product education, and the marketing skills I developed at Wick.',
};

const videos = [
  { slug: 'simplify-the-semester', title: 'Simplify the semester', format: 'Product comparison', description: 'A good / better / best framing that turns a planning problem into an approachable product story.', skill: 'Message framing · scripting · product storytelling' },
  { slug: 'secret-to-a-4-0', title: 'My secret to a 4.0', format: 'Creator-led study advice', description: 'A personal student hook that connects study advice with a relatable audience need.', skill: 'Audience empathy · hooks · on-camera communication' },
  { slug: 'sorting-syllabi', title: 'Sorting syllabi, minus the chaos', format: 'Problem-led creative', description: 'A familiar student frustration becomes the starting point for explaining a useful product workflow.', skill: 'Problem framing · short-form editing · product education' },
];

export default function GrowthPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
      <nav aria-label="Growth navigation" className="flex items-center justify-between border-b border-black/10 pb-6 text-sm text-[#5c6d8c]">
        <a href="/#product-growth" className="hover:underline underline-offset-4">← Back to portfolio</a>
        <a href="/" className="display-font text-xl italic text-[#343741]">Ivy Lee</a>
      </nav>
      <header className="max-w-3xl py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b657a]">Wick · Product / Growth</p>
        <h1 className="display-font mt-5 text-5xl italic leading-[1.05] tracking-[-0.04em] sm:text-6xl">Learning fast. Creating with purpose.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#676b75]">I learned marketing and growth by doing: creating around 30 videos for Wick, researching student needs, and turning product features into stories people could connect with.</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#676b75]">Alongside video creation, I researched 10+ education and productivity platforms, designed surveys around four product/UI variants, and built a 13-week back-to-school content plan.</p>
      </header>

      <section aria-labelledby="growth-skills" className="rounded-[2rem] border border-white bg-[#f6dfe5]/70 p-6 sm:p-8">
        <h2 id="growth-skills" className="display-font text-3xl italic">What I developed</h2>
        <ul className="mt-5 grid gap-4 text-sm leading-6 text-[#6e6267] sm:grid-cols-2">
          <li><strong className="block text-[#533b46]">Audience-first storytelling</strong>Translate student pain points into relevant hooks and clear messages.</li>
          <li><strong className="block text-[#533b46]">End-to-end video creation</strong>Move from concepts and scripts to filming, editing, and finished creative.</li>
          <li><strong className="block text-[#533b46]">Product education</strong>Explain features through practical use cases and accessible tutorials.</li>
          <li><strong className="block text-[#533b46]">Research & creative iteration</strong>Compare approaches, absorb feedback, and develop a consistent content plan.</li>
        </ul>
      </section>

      <section aria-labelledby="selected-videos" className="py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#747985]">Three selected creative examples</p>
        <h2 id="selected-videos" className="display-font mt-3 text-4xl italic">From a hook to a helpful story.</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {videos.map((video) => (
            <article key={video.slug} className="min-w-0">
              <div className="mx-auto max-w-[18rem] overflow-hidden rounded-2xl bg-[#22242a] shadow-sm">
                <video controls playsInline preload="none" poster={`/growth/${video.slug}.jpg`} aria-label={video.title} className="aspect-[9/16] w-full object-contain">
                  <source src={`/growth/${video.slug}.mp4`} type="video/mp4" />
                  <a href={`/growth/${video.slug}.mp4`}>Watch {video.title}</a>
                </video>
              </div>
              <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#9b657a]">{video.format}</p>
              <h3 className="display-font mt-2 text-2xl italic">{video.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#676b75]">{video.description}</p>
              <p className="mt-3 text-xs leading-5 text-[#5c6d8c]">{video.skill}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="company-tutorial" className="border-t border-black/10 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#747985]">Product education</p>
        <h2 id="company-tutorial" className="display-font mt-3 text-4xl italic">A tutorial made for Wick.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#676b75]">A company tutorial I created to make a product workflow easier to understand, putting clear explanations and step-by-step communication into practice.</p>
        <div className="mt-6 overflow-hidden rounded-2xl bg-[#22242a]">
          <iframe src="https://www.youtube-nocookie.com/embed/0QP3iFkZEZU" title="Wick tutorial created by Ivy Lee" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="aspect-video w-full border-0" />
        </div>
        <a href="https://youtu.be/0QP3iFkZEZU" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-[#5c6d8c] underline underline-offset-4">Watch the tutorial on YouTube ↗</a>
      </section>
      <footer className="border-t border-black/10 pt-7 text-sm text-[#5c6d8c]"><a href="/#product-growth" className="hover:underline">← Back to Product / Growth</a></footer>
    </main>
  );
}
