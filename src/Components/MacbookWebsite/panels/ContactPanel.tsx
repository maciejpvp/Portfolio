import { FaFileArrowDown } from "react-icons/fa6";

import { contactLinks, profile } from "@/data/profile";

import { ScreenLink } from "../ScreenLink";
import { PanelHeading } from "./PanelHeading";

const primary = contactLinks.filter((link) => link.primary);
const secondary = contactLinks.filter((link) => !link.primary);

/**
 * Email leads, because the old screen had no email anywhere — the four buttons were
 * GitHub, LinkedIn, Telegram and Signal at equal weight, two of which read as personal
 * chat. Telegram is gone; Signal is demoted below the professional channels.
 *
 * Budget: heading 74 + gap 24 + lead 2 lines + CTAs 96 + secondary rows ≈ 721 of 780.
 */
export const ContactPanel = () => (
  <section aria-labelledby="tab-Contact" className="flex flex-col gap-6">
    <PanelHeading>Contact</PanelHeading>

    <p className="text-body text-muted-foreground max-w-[1300px]">
      Email is the quickest way to reach me. Happy to talk about a role, do a
      take-home, or walk through anything on this screen.
    </p>

    <div className="flex flex-wrap gap-4">
      {profile.cvUrl && (
        <ScreenLink
          href={profile.cvUrl}
          icon={FaFileArrowDown}
          variant="primary"
          download
        >
          Download CV
        </ScreenLink>
      )}
      {primary.map(({ label, detail, href, icon, external }, index) => (
        <ScreenLink
          key={label}
          href={href}
          icon={icon}
          external={external}
          variant={!profile.cvUrl && index === 0 ? "primary" : "outline"}
          aria-label={detail ? `${label}: ${detail}` : label}
        >
          {detail ?? label}
        </ScreenLink>
      ))}
    </div>

    {/* Wraps as pills rather than full-width rows, so a demoted channel does not carry
        more visual weight than the primary ones above it. */}
    {secondary.length > 0 && (
      <ul className="mt-2 flex flex-wrap gap-3">
        {secondary.map(({ label, detail, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="bg-card hover:bg-surface-raised focus-visible:ring-ring flex items-center gap-5 rounded-2xl p-5 transition-colors duration-150 focus-visible:ring-8 focus-visible:outline-none"
            >
              <Icon aria-hidden="true" className="size-10 shrink-0" />
              <span className="text-label font-medium">{label}</span>
              {detail && (
                <span className="text-label text-muted-foreground">
                  {detail}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    )}
  </section>
);
