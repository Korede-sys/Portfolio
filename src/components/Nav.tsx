import { useSiteContent } from "../lib/SiteContentContext";

const NAV_ITEMS = [
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "booking", href: "#booking" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const { content } = useSiteContent();
  const { profile } = content;
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/75 border-b border-[var(--border)]">
      <nav className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/favicon-48.png" alt="Kotech Solutions" className="w-7 h-7 rounded-full" />
          <span
            className="text-sm font-semibold text-white"
            style={{ fontFamily: "var(--mono)" }}
          >
            {profile.name.toLowerCase()}
            <span className="text-[var(--accent)]">.</span>
          </span>
        </a>
        <ul className="flex items-center gap-5 sm:gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                style={{ fontFamily: "var(--mono)" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
