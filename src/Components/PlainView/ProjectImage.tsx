import { useState } from "react";
import { FaCode } from "react-icons/fa6";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * A screenshot that degrades to a labelled placeholder instead of a broken-image hole.
 *
 * The screenshots used to be hotlinked from raw.githubusercontent.com, so any blip there
 * left empty gaps mid-visit. They are self-hosted now, but the fallback stays: a missing
 * file during the 30 seconds a recruiter spends here is not worth the risk.
 */
export const ProjectImage = ({ src, alt, className = "" }: Props) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-muted text-muted-foreground flex items-center justify-center ${className}`}
      >
        <FaCode aria-hidden="true" className="size-8 opacity-40" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      // Deliberately not lazy. This page is meant to be printed or saved as a PDF, and a
      // lazy image below the fold never loads before the print snapshot is taken, leaving
      // an empty box in the document someone forwards. The screenshots are tens of KB.
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
