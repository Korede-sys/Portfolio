import { useSiteContent } from "../lib/SiteContentContext";

export default function Toolchain() {
  const { content } = useSiteContent();
  const { skills } = content;
  return (
    <section id="skills" className="border-b border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionEyebrow label="toolchain.json" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10">
          What I build with
        </h2>

        <div
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 text-sm sm:text-[15px] overflow-x-auto"
          style={{ fontFamily: "var(--mono)" }}
        >
          <div className="text-[var(--muted)]">{"{"}</div>
          {skills.map((group, i) => (
            <div key={group.category} className="pl-4 sm:pl-6 py-1.5">
              <span className="text-[var(--accent2)]">"{group.category}"</span>
              <span className="text-[var(--muted)]">: [</span>
              <div className="pl-4 sm:pl-6 flex flex-wrap gap-x-2">
                {group.items.map((item, idx) => (
                  <span key={item} className="text-[var(--accent)]">
                    "{item}"{idx < group.items.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <span className="text-[var(--muted)]">
                ]{i < skills.length - 1 ? "," : ""}
              </span>
            </div>
          ))}
          <div className="text-[var(--muted)]">{"}"}</div>
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
