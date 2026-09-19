import { techGroups } from "@/data/profile";

import { PanelHeading } from "./PanelHeading";

/**
 * Three grouped columns, replacing the old infinite marquee.
 *
 * The marquee looked good and worked badly: it was frame-rate dependent (a raw
 * `scrollLeft += 1` per frame), it hid roughly half the list at any moment, and its labels
 * were `text-sm` — about 5 device px once the camera shrinks this screen. A recruiter
 * keyword-scanning for "AWS" or "TypeScript" could not do it.
 *
 * Budget: heading 74 + gap 24 + 3 columns of ~340 ≈ 437 of 780. This is the panel with the
 * most slack, so new entries should land here first.
 */
export const StackPanel = () => (
  <section aria-labelledby="tab-Stack" className="flex flex-col gap-6">
    <PanelHeading>Tech stack</PanelHeading>

    <div className="grid grid-cols-3 gap-8">
      {techGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-4">
          <h3 className="text-label text-muted-foreground font-semibold tracking-wide uppercase">
            {group.label}
          </h3>
          <ul className="flex flex-wrap gap-3">
            {group.items.map(({ name, icon: Icon, color }) => (
              <li
                key={name}
                className="bg-surface-raised text-label flex items-center gap-3 rounded-xl px-4 py-3 font-medium"
              >
                <Icon
                  aria-hidden="true"
                  className="size-10 shrink-0"
                  // Brand colours are omitted in profile.ts where the mark is black
                  // (Next.js, Express) so it inherits the foreground instead of vanishing.
                  style={color ? { color } : undefined}
                />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
