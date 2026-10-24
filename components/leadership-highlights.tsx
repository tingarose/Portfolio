"use client";

import { useId, useRef, useState } from 'react';
import { leadershipExperience } from '@/lib/portfolio-content';

export function LeadershipHighlights() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function navigate(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % leadershipExperience.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + leadershipExperience.length) % leadershipExperience.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = leadershipExperience.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="leadership-highlights">
      <div role="tablist" aria-label="Leadership roles" className="leadership-role-list">
        {leadershipExperience.map((role, index) => (
          <button key={role.title} id={`${id}-role-${index}`} role="tab" type="button"
            aria-selected={selected === index} aria-controls={`${id}-panel-${index}`} tabIndex={selected === index ? 0 : -1}
            ref={(element) => { tabs.current[index] = element; }}
            onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}
            className="leadership-role rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315fca]">
            <span className="block text-sm font-semibold">{role.title}</span>
            <span className="mt-1 block text-xs leading-5">{role.organization}</span>
          </button>
        ))}
      </div>
      <div className="min-w-0">
        {leadershipExperience.map((role, index) => (
          <section key={role.title} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-role-${index}`}
            hidden={selected !== index} tabIndex={0} className="leadership-detail rounded-2xl border border-black/[0.07] bg-[#fffdfa] p-5 focus-visible:outline-2 focus-visible:outline-[#315fca] sm:p-6">
            <p className="text-xs font-semibold leading-5 text-[#5c6d8c]">{role.metric}</p>
            <h3 className="display-font mt-2 text-2xl italic leading-tight text-[#343741]">{role.title}</h3>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#5c6d8c]">{role.organization}</p>
            <p className="mt-3 text-sm leading-6 text-[#575d69]">{role.text}</p>
            <h4 className="mt-4 text-xs font-semibold text-[#5c6d8c]">Skills developed</h4>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-5 text-[#5c6d8c]">
              {role.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
