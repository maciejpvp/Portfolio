import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  icon?: IconType;
  children: ReactNode;
  /** Filled for the one or two primary calls to action, outlined for the rest. */
  variant?: "primary" | "outline" | "subtle";
  /** Opens in a new tab. Leave false for `mailto:` and downloads. */
  external?: boolean;
  download?: boolean;
  className?: string;
  "aria-label"?: string;
};

/**
 * Every outbound destination on the MacBook screen goes through this.
 *
 * It is a real `<a href>`, which the old screen never had — everything was a
 * `<button onClick={window.open}>`, so middle-click, right-click → copy link address, and
 * open-in-new-tab all silently did nothing. Recruiters do all three.
 *
 * Sizing is pinned to this surface's floors: 88px hit target, 36px label, 40px icon, 8px
 * focus ring. Anything smaller vanishes once the camera shrinks the screen — which is also
 * why the shadcn Button (h-9, text-sm, 3px ring) is not used here.
 */
export const ScreenLink = ({
  href,
  icon: Icon,
  children,
  variant = "outline",
  external = false,
  download = false,
  className,
  ...rest
}: Props) => (
  <a
    href={href}
    download={download || undefined}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={cn(
      "inline-flex h-22 items-center justify-center gap-4 rounded-2xl px-8",
      "text-label font-semibold whitespace-nowrap transition-colors duration-150",
      "focus-visible:ring-ring focus-visible:ring-8 focus-visible:ring-offset-4",
      "focus-visible:ring-offset-background focus-visible:outline-none",
      variant === "primary" &&
        "bg-foreground text-background hover:bg-foreground/85",
      variant === "outline" &&
        "border-border border-[3px] hover:bg-surface-raised",
      variant === "subtle" && "bg-card hover:bg-surface-raised",
      className,
    )}
    {...rest}
  >
    {Icon && <Icon aria-hidden="true" className="size-10 shrink-0" />}
    {children}
  </a>
);
