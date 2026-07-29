import { useEffect, useState } from "react";
import { useSiteContent } from "../lib/SiteContentContext";

export default function Hero() {
  const { content } = useSiteContent();
  const { profile } = content;
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  const LINES = [
    `whoami`,
    `${profile.name.toLowerCase()} — ${profile.role.toLowerCase()}`,
    `cat tagline.txt`,
  ];

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setDone(true);
      return;
    }
    const full = LINES[lineIndex];
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setTyped("");
    }, 260);
    return () => clearTimeout(t);
  }, [typed, lineIndex]);

  const priorLines = LINES.slice(0, lineIndex);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 sm:py-36">
        <div
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm p-6 shadow-2xl shadow-black/40"
          style={{ fontFamily: "var(--mono)" }}
        >
          <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs text-[var(--muted)]">~/portfolio</span>
          </div>

          <div className="text-sm sm:text-base leading-relaxed">
            {priorLines.map((line, i) => (
              <div key={i} className="text-[var(--muted)]">
                <span className="text-[var(--accent2)]">$</span> {line}
              </div>
            ))}
            {lineIndex < LINES.length && (
              <div className="text-[var(--muted)]">
                <span className="text-[var(--accent2)]">$</span> {typed}
                <span className="caret" />
              </div>
            )}
          </div>

          {done && (
            <div className="mt-5 pt-5 border-t border-[var(--border)] animate-[fadeIn_0.4s_ease]">
              <h1
                className="text-3xl sm:text-4xl font-semibold text-white tracking-tight"
                style={{ fontFamily: "var(--sans)" }}
              >
                {profile.name}
              </h1>
              <p className="mt-1 text-[var(--accent)] text-sm sm:text-base">{profile.role}</p>
              <p className="mt-4 text-[var(--text)]/90 max-w-xl leading-relaxed" style={{ fontFamily: "var(--sans)" }}>
                {profile.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-md bg-[var(--accent)] text-black text-sm font-medium hover:brightness-110 transition"
                  style={{ fontFamily: "var(--sans)" }}
                >
                  View projects
                </a>
                <a
                  href="#booking"
                  className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition"
                  style={{ fontFamily: "var(--sans)" }}
                >
                  Book a call
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
