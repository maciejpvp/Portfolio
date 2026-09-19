import { FaAws } from "react-icons/fa";

import { highlights, profile } from "@/data/profile";

import { PanelHeading } from "./PanelHeading";

/**
 * Budget: heading 74 + gap 24 + bio 3 lines + note 2 lines + certs row 74 + highlight
 * row 152 ≈ 700 of 780. The bio is capped at ~380 characters in profile.ts to hold that.
 */
export const AboutPanel = () => (
  <section aria-labelledby="tab-About" className="flex flex-col gap-6">
    <PanelHeading>About</PanelHeading>

    <p className="text-body text-muted-foreground max-w-[1200px]">
      {profile.bio}
    </p>

    <p className="text-body max-w-[1200px] font-medium">{profile.note}</p>

    <ul className="flex flex-wrap gap-4">
      {profile.certifications.map((certification) => (
        <li
          key={certification}
          className="bg-surface-raised text-label flex items-center gap-3 rounded-xl px-4 py-3 font-medium"
        >
          <FaAws
            aria-hidden="true"
            className="size-10 shrink-0 text-[#FF9900]"
          />
          {certification}
        </li>
      ))}
    </ul>

    <dl className="mt-2 grid grid-cols-3 gap-6">
      {highlights.map(({ value, label }) => (
        <div
          key={label}
          // flex-col-reverse puts the value on top visually so the numbers align across
          // tiles, while keeping <dt> before <dd> in source order.
          className="bg-card border-border flex flex-col-reverse gap-2 rounded-2xl border-[3px] p-6"
        >
          <dt className="text-label text-muted-foreground">{label}</dt>
          <dd className="text-h3">{value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
