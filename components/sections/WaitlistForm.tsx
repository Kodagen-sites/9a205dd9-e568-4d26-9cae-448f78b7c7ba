"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  note?: string;
  className?: string;
}

export default function WaitlistForm({ note, className }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, teamSize: size }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-2xl border border-hairline-strong bg-surface/60 backdrop-blur-md p-8 text-center ${className ?? ""}`}
      >
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-eyebrow opacity-70 mb-3">
          You're in
        </div>
        <h3 className="font-display text-2xl text-ink mb-2">Check your inbox.</h3>
        <p className="text-muted text-sm max-w-sm mx-auto">
          We sent a confirmation to <span className="text-ink">{email}</span>. We'll be in touch within 48 hours with onboarding details and your founder pricing.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-hairline-strong bg-bg/85 backdrop-blur-md p-6 md:p-8 space-y-4 ${className ?? ""}`}
    >
      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-eyebrow opacity-70" htmlFor="wl-email">
          Work email
        </label>
        <input
          id="wl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourcompany.com"
          className="w-full px-4 py-3 rounded-lg border border-hairline bg-surface/40 text-ink placeholder:text-muted focus:outline-none focus:border-contrast/50 transition-colors font-body"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-eyebrow opacity-70" htmlFor="wl-name">
            Your name
          </label>
          <input
            id="wl-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
            className="w-full px-4 py-3 rounded-lg border border-hairline bg-surface/40 text-ink placeholder:text-muted focus:outline-none focus:border-contrast/50 transition-colors font-body"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-eyebrow opacity-70" htmlFor="wl-size">
            Team size
          </label>
          <select
            id="wl-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-hairline bg-surface/40 text-ink focus:outline-none focus:border-contrast/50 transition-colors font-body"
          >
            <option value="">Optional</option>
            <option value="1-5">1–5</option>
            <option value="6-20">6–20</option>
            <option value="21-100">21–100</option>
            <option value="100+">100+</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-6 py-4 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Reserve my spot →"}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-600 font-mono">
          Something went wrong. Try again or email <a className="underline" href="mailto:hello@flowsync.dev">hello@flowsync.dev</a>.
        </p>
      )}
      {note && (
        <p className="text-[11px] text-muted text-center font-body">{note}</p>
      )}
    </form>
  );
}
