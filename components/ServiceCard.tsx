"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * ServiceCard — pearl/platinum light theme.
 * Adapted from CV7 Bento (kept uniform here — caller uses a 3-col grid).
 * Image is optional (graceful gradient fallback).
 */

export interface ServiceCardData {
  slug: string;
  name: string;
  description: string;
  image?: string;
  highlights?: string[];
}

interface Props {
  service: ServiceCardData;
  index?: number;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full rounded-2xl border border-hairline-strong bg-bg overflow-hidden transition-all hover:border-contrast/40 hover:shadow-[0_18px_40px_-24px_rgba(58,61,69,0.35)] focus:outline-none focus:ring-2 focus:ring-contrast/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface via-bg to-accent/20">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-95 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl border border-hairline-strong bg-bg/70 backdrop-blur-sm" />
          </div>
        )}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/85 backdrop-blur-md border border-hairline-strong flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="p-6 md:p-7 space-y-3">
        <h3 className="font-display text-xl text-ink leading-tight tracking-tight">
          {service.name}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-3">
          {service.description}
        </p>
        <div className="pt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-eyebrow group-hover:text-ink transition-colors">
          Read more →
        </div>
      </div>
    </Link>
  );
}
