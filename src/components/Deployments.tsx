import { useSiteContent } from "../lib/SiteContentContext";
import { SectionEyebrow } from "./Toolchain";
import { getSkillIcon } from "../data/skillIcons";

function hashHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function ProjectCover({ name, stack }: { name: string; stack: string[] }) {
  const hue = hashHue(name);
  const initials = name
    .split(" ")
    .filter((w) => w.length > 0)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-full h-56 border-b border-[var(--border)] relative overflow-hidden flex flex-col items-center justify-center gap-4"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 12%), hsl(${(hue + 40) % 360} 40% 8%))`,
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <span
        className="relative text-5xl font-bold tracking-widest opacity-90"
        style={{ fontFamily: "var(--mono)", color: `hsl(${hue} 70% 65%)` }}
      >
        {initials}
      </span>
      <div className="relative flex items-center gap-3">
        {stack.slice(0, 4).map((tech) => {
          const Icon = getSkillIcon(tech);
          return <Icon key={tech} size={18} className="text-[var(--muted)]" />;
        })}
      </div>
    </div>
  );
}

export default function Deployments() {
  const { content } = useSiteContent();
  const { projects } = content;
  return (
    <section id="projects" className="border-b border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionEyebrow label="deployments" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10">
          Things I've shipped
        </h2>

        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.name}
              className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent2)]/50 transition-colors"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={`${project.name} screenshot`}
                  className="w-full h-56 object-cover object-top border-b border-[var(--border)]"
                  loading="lazy"
                />
              ) : (
                <ProjectCover name={project.name} stack={project.stack} />
              )}

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    {project.status === "live" ? (
                      <span className="status-dot" aria-hidden />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[var(--muted)]" aria-hidden />
                    )}
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted)]"
                      style={{ fontFamily: "var(--mono)" }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex gap-3 text-sm">
                    {project.private ? (
                      <span
                        className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted)]"
                        style={{ fontFamily: "var(--mono)" }}
                      >
                        private
                      </span>
                    ) : (
                      <>
                        {project.href && project.href !== "#" && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--accent2)] hover:underline"
                          >
                            Live →
                          </a>
                        )}
                        {project.repo && project.repo !== "#" && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--muted)] hover:text-[var(--text)] hover:underline"
                          >
                            Source
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-[var(--text)]/85 leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2" style={{ fontFamily: "var(--mono)" }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-[var(--surface-2)] text-[var(--accent)] border border-[var(--border)]"
                    >
                      --{tech.toLowerCase().replace(/[.\s]/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
