import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge only knows Tailwind's stock class names. The MacBook screen's type scale
 * adds `text-display|h2|h3|lead|body|label` (see the `@theme` block in index.css), and
 * without this registration tailwind-merge reads them as *text colours* — so
 * `cn("text-label", "text-foreground")` silently dropped the size and the text fell back
 * to 16px, which is about 6 device pixels once the 3D camera shrinks the screen.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "body", "label"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
