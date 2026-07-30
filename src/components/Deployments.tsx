import { useSiteContent } from "../lib/SiteContentContext";
import { SectionEyebrow } from "./Toolchain";

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
                <div
                  className="w-full h-40 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-xs text-[var(--muted)]"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  no screenshot yet — add one in /admin
                </div>
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
