import type { IconType } from "react-icons";
import { FaAws, FaGit, FaGithub, FaLinkedin, FaNodeJs } from "react-icons/fa";
import { FaEnvelope, FaSignalMessenger } from "react-icons/fa6";
import {
  SiDocker,
  SiExpress,
  SiFramer,
  SiGo,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPulumi,
  SiReact,
  SiSocketdotio,
  SiSqlite,
  SiTailwindcss,
  SiTerraform,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

export const profile = {
  name: "Oskar Pyrzak",
  role: "Full-stack Developer",
  tagline: "React · NestJS · TypeScript · Go · AWS",
  location: "Poland",
  yearsExperience: 3,
  bio:
    "At work, I build full-stack products in React and NestJS. " +
    "Outside of work, I design event-driven systems on AWS writing " +
    "services in Go and provisioning infrastructure in Pulumi.",
  certifications: [
    "AWS Certified Cloud Practitioner",
    "AWS Certified Developer – Associate",
  ],
  avatar: {
    src: "/zdj.webp",
    alt: "Oskar Pyrzak",
  },
  email: "oskar.pyrzak@gmail.com",
  /**
   * Drop a PDF at `public/cv.pdf` and the download button appears everywhere. Until then
   * set this to null — the button renders conditionally rather than 404-ing.
   * TODO: add public/cv.pdf, then set this to "/cv.pdf".
   */
  cvUrl: null as string | null,
  siteUrl: "https://zahut.me/",
} as const;

/** Headline facts for the About panel. Keep to three — the layout budgets for three. */
export const highlights: { value: string; label: string }[] = [
  { value: `${profile.yearsExperience}+ yrs`, label: "Building for the web" },
  { value: "React + NestJS", label: "Day-job stack" },
  { value: "Go + Pulumi", label: "AWS work of my own" },
];

export type ContactLink = {
  label: string;
  /** Shown under the label on the Contact panel, e.g. the actual address or handle. */
  detail?: string;
  href: string;
  icon: IconType;
  /** Primary links lead the Contact panel and appear in the header. */
  primary?: boolean;
  /** mailto:/download links stay in this tab; external profiles open in a new one. */
  external?: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    detail: profile.email,
    href: `mailto:${profile.email}?subject=${encodeURIComponent(
      "Role opportunity — " + profile.name,
    )}`,
    icon: FaEnvelope,
    primary: true,
  },
  {
    label: "GitHub",
    detail: "github.com/maciejpvp",
    href: "https://github.com/maciejpvp",
    icon: FaGithub,
    primary: true,
    external: true,
  },
  {
    label: "LinkedIn",
    detail: "in/oskar-pyrzak",
    href: "https://www.linkedin.com/in/oskar-pyrzak-b3310235a/",
    icon: FaLinkedin,
    primary: true,
    external: true,
  },
  {
    label: "Signal",
    detail: "Encrypted messaging",
    href: "https://signal.me/#eu/KQbS9gCgPDZHfKR5rm-6_DHgrhLi-KNdmSGRPYLC2yw9WsLm2IJLYKUyjTvvU-QS",
    icon: FaSignalMessenger,
    external: true,
  },
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  contribution?: string;
  tech: string[];
  image: { src: string; alt: string };
  live?: string;
  source?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mole",
    name: "Mole",
    summary:
      "A TCP/UDP tunnel that gives a machine behind CGNAT a public port, with no inbound firewall rule.",
    contribution:
      "The client dials out and holds one control connection open, so nothing inbound is " +
      "ever needed. Not HTTP-specific: game servers, SSH and databases tunnel the same way. " +
      "Built out as a real service — Google sign-in, live quota enforcement, Stripe, admin panel.",
    tech: ["Go", "React", "PostgreSQL", "Docker"],
    image: {
      src: "/projects/mole.png",
      alt: "Mole's web UI, a draggable-window desktop listing open tunnels",
    },
    source: "https://github.com/maciejpvp/Mole",
    featured: true,
  },
  {
    slug: "image-pipeline",
    name: "ImagePipeline",
    summary:
      "Upload an image and search the whole collection back in plain English, on vector embeddings.",
    // TODO: confirm.
    contribution:
      "An S3 upload triggers a Go Lambda that moderates the image, labels it, and turns it " +
      "into a 1024-dimension Titan embedding indexed in OpenSearch. Search embeds the query " +
      "text into that same vector space and runs k-NN against it. Infrastructure is Pulumi, in Go.",
    tech: ["Go", "AWS Lambda", "OpenSearch", "Pulumi"],
    image: {
      src: "/projects/image-pipeline.png",
      alt: "ImagePipeline's search page returning images matched to a text query",
    },
    source: "https://github.com/maciejpvp/ImagePipeline",
    featured: true,
  },
  {
    slug: "scalable-counter",
    name: "ScalableCounter",
    summary:
      "A write-heavy like counter that buffers in memory and flushes to DynamoDB once every 30 seconds.",
    // TODO: confirm.
    contribution:
      "Batching the writes cuts DynamoDB write calls by ~99.7% at a million requests, and " +
      "reads merge the in-memory buffer with the stored value so the count stays correct. " +
      "CloudFront in front of an ALB that only accepts a secret header, all in Terraform.",
    tech: ["Go", "DynamoDB", "Terraform", "CloudFront"],
    image: {
      src: "/projects/scalable-counter.png",
      alt: "ScalableCounter's architecture diagram: CloudFront to ALB to EC2 to DynamoDB",
    },
    source: "https://github.com/maciejpvp/ScalableCounter",
    featured: true,
  },
  // TODO: one more featured project would fill the Work panel's second row. The MacBook
  // screen shows up to four; PlainView lists every entry here regardless of `featured`.
];

/** Featured subset, hard-capped at the four the Work panel's height budget allows. */
export const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, 4);

export type Tech = {
  name: string;
  icon: IconType;
  /** Brand colour. Omitted where the brand mark is black and would vanish on a dark card. */
  color?: string;
};

export type TechGroup = { label: string; items: Tech[] };

/**
 * Grouped rather than a flat marquee so the list can be keyword-scanned.
 *
 * Two icon corrections vs. the old flat list: React Three Fiber used the *Framer* logo
 * (identical to the Framer Motion entry beside it) and Socket.IO used a generic lightning
 * bolt. Next.js and Express.js had `#000000` brand colours, invisible on a dark card, so
 * they inherit the foreground instead of setting one.
 */
export const techGroups: TechGroup[] = [
  {
    label: "Front end",
    items: [
      { name: "React", icon: SiReact, color: "#61DBFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "React Three Fiber", icon: SiThreedotjs, color: "#61DBFB" },
      { name: "Framer Motion", icon: SiFramer, color: "#8B5CF6" },
    ],
  },
  {
    label: "Back end",
    items: [
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Node.js", icon: FaNodeJs, color: "#68A063" },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#4A9FD4" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#FFAA00" },
    ],
  },
  {
    label: "Infra & tooling",
    items: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Pulumi", icon: SiPulumi, color: "#8A3391" },
      { name: "Terraform", icon: SiTerraform, color: "#9B6BE0" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: FaGit, color: "#F05032" },
    ],
  },
];
