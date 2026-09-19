import { MotionConfig } from "framer-motion";
import { FaAws } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaFileArrowDown } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  contactLinks,
  highlights,
  profile,
  projects,
  techGroups,
} from "@/data/profile";

import { ProjectImage } from "./ProjectImage";

/**
 * The text version of the portfolio: semantic, scrollable, printable, and free of any
 * WebGL dependency. It is what a recruiter on a locked-down laptop gets, what a phone
 * gets, and what anyone reaches deliberately at `?plain=1` to forward to a hiring manager.
 *
 * It carries the *full* project list, unlike the MacBook screen which shows four.
 *
 * Unlike that screen this is a genuine 1:1 viewport, so it uses the normal Tailwind type
 * scale and the shadcn primitives as authored, rather than the oversized `--text-*` tokens.
 */

const ExternalIcon = () => (
  <FaArrowUpRightFromSquare aria-hidden="true" className="size-3 opacity-60" />
);

export const PlainView = ({ showSceneLink }: { showSceneLink: boolean }) => (
  <MotionConfig reducedMotion="user">
    <div className="bg-background text-foreground min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={profile.avatar.src}
            alt={profile.avatar.alt}
            width={112}
            height={112}
            className="border-border size-24 shrink-0 rounded-full border-2 object-cover sm:size-28"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {profile.role} · {profile.location}
            </p>
            <p className="text-muted-foreground text-sm">{profile.tagline}</p>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile.cvUrl && (
            <Button asChild size="lg">
              <a href={profile.cvUrl} download>
                <FaFileArrowDown aria-hidden="true" />
                Download CV
              </a>
            </Button>
          )}
          {contactLinks
            .filter((link) => link.primary)
            .map(({ label, href, icon: Icon, external }) => (
              <Button
                key={label}
                asChild
                size="lg"
                variant={profile.cvUrl ? "outline" : "default"}
              >
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </Button>
            ))}
        </div>

        <section aria-labelledby="about" className="mt-14">
          <h2 id="about" className="text-xl font-semibold">
            About
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            {profile.bio}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.certifications.map((certification) => (
              <li
                key={certification}
                className="bg-card border-border flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium"
              >
                <FaAws aria-hidden="true" className="size-4 text-[#FF9900]" />
                {certification}
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="border-border bg-card rounded-lg border p-4"
              >
                {/* Value first so the numbers align across tiles even when a label wraps.
                    Source order is reversed with flex-col-reverse to keep <dt> before
                    <dd>, which the definition-list semantics require. */}
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                    {label}
                  </dt>
                  <dd className="text-lg font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="work" className="mt-14">
          <h2 id="work" className="text-xl font-semibold">
            Selected work
          </h2>
          <div className="mt-5 flex flex-col gap-6">
            {projects.map((project) => (
              <Card key={project.slug} className="overflow-hidden pt-0">
                <ProjectImage
                  src={project.image.src}
                  alt={project.image.alt}
                  className="border-border aspect-video w-full border-b object-cover"
                />
                <CardHeader>
                  {/* CardTitle renders a div, so the heading level is set here instead. */}
                  <h3 className="text-lg leading-none font-semibold">
                    {project.name}
                  </h3>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {project.contribution && (
                    <p className="text-sm leading-relaxed">
                      {project.contribution}
                    </p>
                  )}
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.live && (
                      <Button asChild size="sm">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live demo
                          <ExternalIcon />
                        </a>
                      </Button>
                    )}
                    {project.source && (
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source
                          <ExternalIcon />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="stack" className="mt-14">
          <h2 id="stack" className="text-xl font-semibold">
            Tech stack
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            {techGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {group.items.map(({ name, icon: Icon, color }) => (
                    <li key={name} className="flex items-center gap-2 text-sm">
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0"
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

        <section aria-labelledby="contact" className="mt-14">
          <h2 id="contact" className="text-xl font-semibold">
            Contact
          </h2>
          <ul className="mt-5 flex flex-col gap-2">
            {contactLinks.map(
              ({ label, detail, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="border-border hover:bg-card focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg border p-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <Icon aria-hidden="true" className="size-5 shrink-0" />
                    <span className="flex flex-col">
                      <span className="font-medium">{label}</span>
                      {detail && (
                        <span className="text-muted-foreground text-sm">
                          {detail}
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </section>

        <footer className="border-border text-muted-foreground mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-6 text-sm">
          <span>
            {profile.name} · {profile.role}
          </span>
          {showSceneLink && (
            <a
              href="/"
              className="focus-visible:ring-ring/50 rounded underline underline-offset-4 hover:no-underline focus-visible:ring-2 focus-visible:outline-none print:hidden"
            >
              View the interactive 3D version
            </a>
          )}
        </footer>
      </div>
    </div>
  </MotionConfig>
);
