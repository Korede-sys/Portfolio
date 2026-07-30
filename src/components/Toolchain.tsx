import { useSiteContent } from "../lib/SiteContentContext";
import { getSkillIcon } from "../data/skillIcons";

export default function Toolchain() {
  const { content } = useSiteContent();
  const { skills } = content;
  return (
    <section id="skills" className="border-b border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionEyebrow label="toolchain" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10">
          What I build with
        </h2>

        <div className="space-y-8">
          {skills.map((group) => (
            <div key={group.category}>
              <h3
                className="text-xs uppercase tracking-wide text-[var(--muted)] mb-3"
                style={{ fontFamily: "var(--mono)" }}
              >
                {group.category.replace(/_/g, " ")}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => {
                  const Icon = getSkillIcon(item);
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] hover:border-[var(--accent2)]/50 transition-colors"
                    >
                      <Icon size={16} className="text-[var(--accent)] shrink-0" />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-xs text-[var(--muted)] mb-4"
      style={{ fontFamily: "var(--mono)" }}
    >
      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
      {label}
    </div>
  );
}
