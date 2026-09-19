import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const TABS = ["About", "Work", "Stack", "Contact"] as const;
export type TabId = (typeof TABS)[number];

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

/** How far the lit segment's glow reaches past the tab on each side, in authored px. */
const BLEED = 48;

/**
 * Tablist for the MacBook screen.
 *
 * Nav owns the rule that divides it from the panel below, because that rule *is* the active
 * indicator: one continuous line with a lit segment that slides along it to the selected tab.
 *
 * The segment is placed from the active button's `offsetLeft`/`offsetWidth`, deliberately
 * *not* a framer-motion `layoutId` underline. Shared-layout animation measures with
 * getBoundingClientRect(), which inside a `<Html transform>` returns the post-matrix3d,
 * perspective-distorted rect; the FLIP deltas come out skewed and the indicator drifts.
 * The offset properties are untransformed layout values relative to the offset parent, so
 * they are immune to that, and animating them is a plain CSS transition rather than FLIP.
 */
export const Nav = ({ active, onChange }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [segment, setSegment] = useState<{ left: number; width: number }>();

  // Layout effect, not an effect: the segment must be in place on the same frame the tab
  // changes, or it animates in from the left edge on first paint.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const button = list.querySelectorAll<HTMLButtonElement>('[role="tab"]')[
        TABS.indexOf(active)
      ];
      if (!button) return;
      const next = { left: button.offsetLeft, width: button.offsetWidth };
      setSegment((current) =>
        current?.left === next.left && current.width === next.width
          ? current
          : next,
      );
    };

    measure();

    // The active tab goes semibold, which changes every tab's width; the web font landing
    // late moves them again. Re-measure rather than trusting the first pass.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const offset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!offset) return;
    event.preventDefault();

    const next = (TABS.indexOf(active) + offset + TABS.length) % TABS.length;
    onChange(TABS[next]);

    // preventScroll matters: this screen's layout box overhangs the canvas, so letting the
    // browser scroll a focused tab into view would shift the whole 3D scene.
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    buttons?.[next]?.focus({ preventScroll: true });
  };

  return (
    // Nothing here may clip: the lit segment overhangs the outer tabs by BLEED, and Shell's
    // px-16 is what gives it room.
    <div className="relative">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Portfolio sections"
        onKeyDown={handleKeyDown}
        className="relative z-10 flex h-22 items-stretch"
      >
        {TABS.map((tab) => {
          const selected = tab === active;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`tab-${tab}`}
              aria-selected={selected}
              aria-controls={`panel-${tab}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab)}
              className={cn(
                "text-label flex cursor-pointer items-center justify-center rounded-t-xl px-10",
                "focus-visible:ring-ring transition-colors duration-150",
                "focus-visible:ring-8 focus-visible:outline-none",
                selected
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground font-medium",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* The rule: one line across the full width of the screen. */}
      <div
        aria-hidden="true"
        className="bg-border absolute inset-x-0 bottom-0 h-[3px]"
      />

      {/* The lit segment riding on that rule. It is a horizontal gradient rather than a solid
          bar with a box-shadow, so the glow spreads along the line only and never above or
          below it — the line stays one height everywhere. The core is pure white rather than
          the cream `--foreground`, because the camera shrinks this screen hard and a hairline
          antialiases down to a fraction of its colour; cream reads as grey there.

          3px, not the 1.5px this was first drawn at, and that is not cosmetic. drei rewrites
          the wrapper's matrix3d every frame, so the browser rasterises this subtree once and
          the compositor scales that raster; moving the camera onto the MacBook magnifies the
          cached bitmap instead of re-rendering at the new scale (the same effect ScreenSurface
          documents). A 1.5px line is well under a device pixel, so which preset the raster was
          taken at decided whether it came out white or grey — it visibly dimmed on focus. 3px
          keeps at least a full device pixel at either preset.

          `left` is fixed at 0 and the position comes from translateX, so the browser animates
          it on the compositor. */}
      {segment && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] transition-[transform,width] duration-300 ease-in-out"
          style={{
            width: segment.width + BLEED * 2,
            transform: `translateX(${segment.left - BLEED}px)`,
            background: `linear-gradient(90deg, transparent, var(--foreground) ${BLEED}px, #fff 50%, var(--foreground) calc(100% - ${BLEED}px), transparent)`,
          }}
        />
      )}
    </div>
  );
};
