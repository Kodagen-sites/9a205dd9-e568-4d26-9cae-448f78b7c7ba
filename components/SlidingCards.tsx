"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

type Card = {
  slug: string;
  name: string;
  description: string;
};

type Props = {
  cards: Card[];
  eyebrow: string;
  heading: string;
  framePattern?: string;
  frameCount?: number;
  padLength?: number;
};

export default function SlidingCards({
  cards,
  eyebrow,
  heading,
  framePattern,
  frameCount = 0,
  padLength = 4,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-bg"
      style={{ height: `${Math.max(cards.length, 1) * 110}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {framePattern && frameCount > 0 && (
          <FrameBackground
            scrollYProgress={scrollYProgress}
            pattern={framePattern}
            frameCount={frameCount}
            padLength={padLength}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg/85" />

        <div className="relative h-full flex flex-col">
          <div className="container-x pt-16 md:pt-24 max-w-7xl mx-auto w-full">
            <div className="eyebrow mb-4">{eyebrow}</div>
            <h2 className="font-display text-ink display-2 text-balance max-w-4xl">
              {heading}
            </h2>
          </div>

          <div className="relative flex-1">
            {cards.map((card, i) => (
              <SlidingCard
                key={card.slug}
                card={card}
                index={i}
                total={cards.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameBackground({
  scrollYProgress,
  pattern,
  frameCount,
  padLength,
}: {
  scrollYProgress: MotionValue<number>;
  pattern: string;
  frameCount: number;
  padLength: number;
}) {
  const [frame, setFrame] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(v * frameCount))
    );
    if (idx !== frame) setFrame(idx);
  });

  const src = pattern.replace(
    "{NNNN}",
    String(frame + 1).padStart(padLength, "0")
  );

  return (
    <div className="absolute inset-0">
      <img
        src={src}
        alt=""
        aria-hidden
        className="w-full h-full object-cover opacity-80"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function SlidingCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: Card;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const slotSize = 1 / total;
  const slotStart = index * slotSize;
  const slotEnd = (index + 1) * slotSize;
  const enterEnd = slotStart + slotSize * 0.22;
  const exitStart = slotEnd - slotSize * 0.22;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // First card already centered at scroll start, last card stays centered at end.
  // Otherwise incoming peeks on the right, outgoing peeks on the left.
  const peekOpacity = 0.32;
  const peekScale = 0.86;
  const startX = isFirst ? "0%" : "78%";
  const endX = isLast ? "0%" : "-78%";
  const startOpacity = isFirst ? 1 : peekOpacity;
  const endOpacity = isLast ? 1 : peekOpacity;
  const startScale = isFirst ? 1 : peekScale;
  const endScale = isLast ? 1 : peekScale;
  const startRotate = isFirst ? 0 : 3;
  const endRotate = isLast ? 0 : -3;

  const x = useTransform(
    scrollYProgress,
    [slotStart, enterEnd, exitStart, slotEnd],
    [startX, "0%", "0%", endX]
  );
  const scale = useTransform(
    scrollYProgress,
    [slotStart, enterEnd, exitStart, slotEnd],
    [startScale, 1, 1, endScale]
  );
  const opacity = useTransform(
    scrollYProgress,
    [slotStart, enterEnd, exitStart, slotEnd],
    [startOpacity, 1, 1, endOpacity]
  );
  const rotate = useTransform(
    scrollYProgress,
    [slotStart, enterEnd, exitStart, slotEnd],
    [startRotate, 0, 0, endRotate]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [slotStart, enterEnd, exitStart, slotEnd],
    [1, 2, 2, 1]
  );

  return (
    <motion.div
      style={{ x, scale, opacity, rotate, zIndex }}
      className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
    >
      <div className="w-full max-w-xl rounded-2xl border border-hairline-strong bg-bg/85 backdrop-blur-xl p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent mb-5 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
          {card.name}
        </h3>
        <p className="text-muted text-base md:text-lg leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}
