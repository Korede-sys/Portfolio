import { useSiteContent } from "../lib/SiteContentContext";
import { SectionEyebrow } from "./Toolchain";

export default function Contact() {
  const { content } = useSiteContent();
  const { profile } = content;
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "GitHub", href: profile.github, value: profile.github.replace("https://", "") },
    { label: "LinkedIn", href: profile.linkedin, value: profile.linkedin.replace("https://", "") },
  ];
  return (
    <footer id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionEyebrow label="contact" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10">
          Let's talk
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4 hover:border-[var(--accent)]/50 transition-colors"
            >
              <span
                className="text-xs text-[var(--muted)] uppercase tracking-wide"
                style={{ fontFamily: "var(--mono)" }}
              >
                {link.label}
              </span>
              <span className="text-sm text-[var(--text)] truncate ml-4">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-[var(--green)]" style={{ fontFamily: "var(--mono)" }}>
          <span className="status-dot" aria-hidden />
          {profile.availability}
        </div>

        <div
          className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]"
          style={{ fontFamily: "var(--mono)" }}
        >
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}
