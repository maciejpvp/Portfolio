import { useState } from "react";
import { FaArrowUpRightFromSquare, FaCode, FaGithub } from "react-icons/fa6";

import type { Project } from "@/data/profile";

/**
 * Hand-rolled rather than shadcn's Card, whose every dimension is authored for a 1:1
 * viewport: `border` (1px → 0.36 device px here), `rounded-xl` (12px → 4), `text-sm`
 * descriptions (14px → 5). Overriding all of it would be more code than this.
 *
 * Height is deliberately *deterministic*: a fixed thumbnail box and a `line-clamp-2`
 * summary mean the card is the same height whatever the copy says. That is what keeps the
 * Work panel inside its height budget when the next project's description turns out to be
 * three sentences long. The title sits at `text-body` rather than `text-h3`, and the summary
 * and chips at `text-caption` — below the surface's 13-device-px read floor, which is a
 * deliberate exception: the title above them carries the meaning, so two cards per row read
 * as cards and not as posters. `contribution` is intentionally not shown here — no room
 * for it at this type size, and PlainView carries it.
 *
 * Each link is a real `<a>`; the card is not one big click target, because a card needs
 * both "live demo" and "source" and a recruiter should be able to middle-click either.
 */
export const ProjectCard = ({ project }: { project: Project }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="bg-card border-border flex flex-col gap-3 rounded-2xl border-[3px] p-5">
      <div className="flex gap-4">
        <div className="border-border aspect-video w-[180px] shrink-0 overflow-hidden rounded-xl border-[3px]">
          {imageFailed ? (
            <div
              role="img"
              aria-label={project.image.alt}
              className="bg-surface-raised flex h-full w-full items-center justify-center"
            >
              <FaCode
                aria-hidden="true"
                className="text-muted-foreground size-9"
              />
            </div>
          ) : (
            <img
              src={project.image.src}
              alt={project.image.alt}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="text-body truncate font-semibold">{project.name}</h3>
          <p className="text-caption text-muted-foreground line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Its own row rather than sharing one with the links: the full stack is four items
          wide, which would either collide with the buttons or wrap into them. PlainView
          still carries the per-project prose. */}
      <ul className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="bg-surface-raised text-caption text-muted-foreground rounded-full px-2.5 py-0 font-medium whitespace-nowrap"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-2">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-ring text-label inline-flex h-12 items-center gap-2 rounded-xl px-4 font-semibold transition-colors focus-visible:ring-8 focus-visible:outline-none"
          >
            Live
            <FaArrowUpRightFromSquare aria-hidden="true" className="size-6" />
          </a>
        )}
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} source on GitHub`}
            className="border-border hover:bg-surface-raised focus-visible:ring-ring text-label inline-flex h-12 items-center gap-2 rounded-xl border-[3px] px-4 font-semibold transition-colors focus-visible:ring-8 focus-visible:outline-none"
          >
            <FaGithub aria-hidden="true" className="size-6" />
            Source
          </a>
        )}
      </div>
    </article>
  );
};
