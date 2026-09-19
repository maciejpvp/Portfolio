import { FaFileArrowDown } from "react-icons/fa6";

import { profile } from "@/data/profile";

import { ScreenLink } from "./ScreenLink";

export const Header = () => (
  <header className="flex h-40 items-center gap-8">
    <img
      src={profile.avatar.src}
      alt={profile.avatar.alt}
      width={160}
      height={160}
      className="border-border size-40 shrink-0 rounded-full border-[6px] object-cover"
    />

    <div className="flex min-w-0 flex-col gap-2">
      {/* The only <h1> on the screen. The name used to be a <p> — and contained a literal
          backtick where the apostrophe belonged. */}
      <h1 className="text-display truncate">{profile.name}</h1>
      <p className="text-label text-muted-foreground flex items-center gap-4">
        <span className="whitespace-nowrap">
          {profile.role} · {profile.location}
        </span>
      </p>
    </div>

    <div className="ml-auto flex shrink-0 items-center gap-4">
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
    </div>
  </header>
);
