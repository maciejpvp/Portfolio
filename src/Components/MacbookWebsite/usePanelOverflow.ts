import { useEffect, useRef, useState } from "react";

/**
 * Watches a scroll container and reports whether its content exceeds it.
 *
 * Every panel on this screen is designed to fit the height budget exactly, because
 * scrolling a DOM layer projected onto a 3D surface is undiscoverable. But hard-fitting
 * breaks silently the moment content grows — a fifth project, a title that wraps, a web
 * font that fails to load and falls back to wider metrics. That was the original bug: the
 * Tech section could be pushed off the bottom of the screen with nothing to indicate it.
 *
 * So the container scrolls as a safety valve, and this hook makes the valve *visible*:
 * a scroll cue for visitors, and a console warning in dev so the regression is caught
 * while editing rather than by a recruiter.
 */
export const usePanelOverflow = (key: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const overflow = node.scrollHeight - node.clientHeight;
      const isOverflowing = overflow > 1;

      setOverflowing(isOverflowing);
      setAtBottom(node.scrollTop >= overflow - 1);

      if (import.meta.env.DEV && isOverflowing) {
        console.warn(
          `[layout budget] The "${key}" panel overflows its ${node.clientHeight}px ` +
            `budget by ${Math.round(overflow)}px. It is scrollable, but scrolling is hard ` +
            `to discover on the 3D screen — trim the content or move it to PlainView.`,
        );
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    // Children too: an image finishing its load changes scrollHeight without resizing the
    // container itself.
    Array.from(node.children).forEach((child) => observer.observe(child));

    node.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", measure);
    };
  }, [key]);

  return { ref, overflowing, atBottom };
};
