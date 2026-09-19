import { featuredProjects, projects } from "@/data/profile";

import { ProjectCard } from "../ProjectCard";
import { PanelHeading } from "./PanelHeading";

const remaining = projects.length - featuredProjects.length;

/**
 * A 2-column grid, replacing the carousel.
 *
 * The carousel hid half the work behind arrows a recruiter had to find, and it was
 * misconfigured anyway: `w-[500px]` on each item never applied, because shadcn's
 * CarouselItem already sets `basis-full` and tailwind-merge does not treat `w-*` and
 * `basis-*` as conflicting. A grid shows everything at once, which is what scanning wants.
 *
 * Budget: heading 74 + gap 24 + 2 rows of ~307 + 24 gap ≈ 736 of 780. `featuredProjects` is
 * still capped at 4 in profile.ts — a third row plus the trailing line would overrun — but
 * the card's own trim leaves headroom now. Everything beyond that lives in PlainView.
 */
export const WorkPanel = () => (
  <section aria-labelledby="tab-Work" className="flex flex-col gap-6">
    <PanelHeading>Selected work</PanelHeading>

    <div className="grid grid-cols-2 gap-6">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>

    {remaining > 0 && (
      <p className="text-label text-muted-foreground">
        {remaining} more {remaining === 1 ? "project is" : "projects are"} listed
        on the{" "}
        <a
          href="/?plain=1"
          className="focus-visible:ring-ring text-foreground rounded underline underline-offset-4 focus-visible:ring-8 focus-visible:outline-none"
        >
          full text version
        </a>
        .
      </p>
    )}
  </section>
);
