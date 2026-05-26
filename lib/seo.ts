import { siteConfig } from "@/content/site-config";
import type { Metadata } from "next";

type BuildMeta = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

export function buildMeta({
  title,
  description,
  path = "/",
  image,
  noindex,
}: BuildMeta = {}): Metadata {
  const { siteUrl, defaultTitle, defaultDescription, defaultOgImage, twitterHandle } =
    siteConfig.seo;
  const resolvedTitle = title || defaultTitle;
  const resolvedDescription = description || defaultDescription;
  const resolvedImage = image || defaultOgImage;
  const url = `${siteUrl.replace(/\/$/, "")}${path}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.company.name,
      images: resolvedImage ? [{ url: resolvedImage, width: 1200, height: 630 }] : [],
      locale: siteConfig.seo.locale,
    },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle || undefined,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage ? [resolvedImage] : [],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
