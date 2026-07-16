import type { Metadata } from "next";

// Next.js REPLACES the `openGraph` / `twitter` objects in a nested page rather
// than deep-merging them with the root layout's. That means a page declaring
// `openGraph: { title }` silently drops both the image injected by the root
// `opengraph-image.tsx` file convention and the root's `twitter.card`. So every
// interior page builds its metadata through here, where those are re-stated.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Apiece — A place for curation",
};

export function pageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  // Matches the root layout's `%s — Apiece` title template, which OG tags
  // don't pick up on their own.
  const socialTitle = `${title} — Apiece`;

  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      siteName: "Apiece",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
