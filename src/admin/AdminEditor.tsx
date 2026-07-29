import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useSiteContent } from "../lib/SiteContentContext";
import type { Profile, Skill, Project, SiteContent } from "../data/content";

export default function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const { content, refresh } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSave() {
    if (!supabase) return;
    setSaving(true);
    setStatus(null);
    const { error } = await supabase
      .from("site_content")
      .update({ data: draft, updated_at: new Date().toISOString() })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus("Saved ✓");
      await refresh();
      setTimeout(() => setStatus(null), 2500);
    }
  }

  function updateProfile(field: keyof Profile, value: string) {
    setDraft((d) => ({ ...d, profile: { ...d.profile, [field]: value } }));
  }

  function updateSkillCategory(index: number, category: string) {
    setDraft((d) => {
      const skills = [...d.skills];
      skills[index] = { ...skills[index], category };
      return { ...d, skills };
    });
  }

  function updateSkillItems(index: number, itemsText: string) {
    setDraft((d) => {
      const skills = [...d.skills];
      skills[index] = {
        ...skills[index],
        items: itemsText.split(",").map((s) => s.trim()).filter(Boolean),
      };
      return { ...d, skills };
    });
  }

  function addSkillGroup() {
    setDraft((d) => ({ ...d, skills: [...d.skills, { category: "new", items: [] }] }));
  }

  function removeSkillGroup(index: number) {
    setDraft((d) => ({ ...d, skills: d.skills.filter((_, i) => i !== index) }));
  }

  function updateProject(index: number, field: keyof Project, value: string | boolean) {
    setDraft((d) => {
      const projects = [...d.projects];
      projects[index] = { ...projects[index], [field]: value } as Project;
      return { ...d, projects };
    });
  }

  function updateProjectStack(index: number, stackText: string) {
    setDraft((d) => {
      const projects = [...d.projects];
      projects[index] = {
        ...projects[index],
        stack: stackText.split(",").map((s) => s.trim()).filter(Boolean),
      };
      return { ...d, projects };
    });
  }

  function addProject() {
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        { name: "New project", status: "live", description: "", stack: [] },
      ],
    }));
  }

  function removeProject(index: number) {
    setDraft((d) => ({ ...d, projects: d.projects.filter((_, i) => i !== index) }));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[var(--bg)]/85 border-b border-[var(--border)] px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ fontFamily: "var(--mono)" }}>
          admin
        </span>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-[var(--green)]">{status}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 rounded-md bg-[var(--accent)] text-black text-sm font-medium hover:brightness-110 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-md border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--text)] transition"
          >
            Sign out
          </button>
          <a
            href="/"
            className="px-3 py-1.5 rounded-md border border-[var(--border)] text-sm text-[var(--accent2)] hover:underline"
          >
            View site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10 space-y-12">
        {/* Profile */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
          <div className="grid gap-3">
            <Field label="Name" value={draft.profile.name} onChange={(v) => updateProfile("name", v)} />
            <Field label="Role / headline" value={draft.profile.role} onChange={(v) => updateProfile("role", v)} />
            <Field
              label="Bio / tagline"
              value={draft.profile.tagline}
              onChange={(v) => updateProfile("tagline", v)}
              textarea
            />
            <Field label="Location" value={draft.profile.location} onChange={(v) => updateProfile("location", v)} />
            <Field
              label="Availability"
              value={draft.profile.availability}
              onChange={(v) => updateProfile("availability", v)}
            />
            <Field label="Email" value={draft.profile.email} onChange={(v) => updateProfile("email", v)} />
            <Field label="GitHub URL" value={draft.profile.github} onChange={(v) => updateProfile("github", v)} />
            <Field
              label="LinkedIn URL"
              value={draft.profile.linkedin}
              onChange={(v) => updateProfile("linkedin", v)}
            />
            <Field
              label="Cal.com username"
              value={draft.profile.calUsername}
              onChange={(v) => updateProfile("calUsername", v)}
            />
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Skills</h2>
            <button
              onClick={addSkillGroup}
              className="text-sm text-[var(--accent2)] hover:underline"
            >
              + Add category
            </button>
          </div>
          <div className="space-y-4">
            {draft.skills.map((skill: Skill, i: number) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    value={skill.category}
                    onChange={(e) => updateSkillCategory(i, e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium text-white outline-none border-b border-transparent focus:border-[var(--accent2)]"
                    placeholder="category name"
                  />
                  <button
                    onClick={() => removeSkillGroup(i)}
                    className="text-xs text-[var(--muted)] hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  value={skill.items.join(", ")}
                  onChange={(e) => updateSkillItems(i, e.target.value)}
                  rows={2}
                  className="w-full rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
                  placeholder="Comma-separated skills"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Projects</h2>
            <button onClick={addProject} className="text-sm text-[var(--accent2)] hover:underline">
              + Add project
            </button>
          </div>
          <div className="space-y-4">
            {draft.projects.map((project: Project, i: number) => (
              <div
                key={i}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    value={project.name}
                    onChange={(e) => updateProject(i, "name", e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium text-white outline-none border-b border-transparent focus:border-[var(--accent2)]"
                    placeholder="Project name"
                  />
                  <button
                    onClick={() => removeProject(i)}
                    className="text-xs text-[var(--muted)] hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>

                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(i, "description", e.target.value)}
                  rows={3}
                  className="w-full rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
                  placeholder="Description"
                />

                <input
                  value={project.stack.join(", ")}
                  onChange={(e) => updateProjectStack(i, e.target.value)}
                  className="w-full rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
                  placeholder="Stack, comma-separated (e.g. React, TypeScript)"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={project.href ?? ""}
                    onChange={(e) => updateProject(i, "href", e.target.value)}
                    className="rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
                    placeholder="Live URL (optional)"
                  />
                  <input
                    value={project.repo ?? ""}
                    onChange={(e) => updateProject(i, "repo", e.target.value)}
                    className="rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
                    placeholder="Repo URL (optional)"
                  />
                </div>

                <div className="flex items-center gap-5 text-sm">
                  <label className="flex items-center gap-2 text-[var(--muted)]">
                    <select
                      value={project.status}
                      onChange={(e) => updateProject(i, "status", e.target.value)}
                      className="bg-[var(--surface-2)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text)]"
                    >
                      <option value="live">live</option>
                      <option value="archived">archived</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-[var(--muted)]">
                    <input
                      type="checkbox"
                      checked={!!project.private}
                      onChange={(e) => updateProject(i, "private", e.target.checked)}
                    />
                    Private (hides live/repo links, shows "private" badge)
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-[var(--muted)] mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent2)]"
        />
      )}
    </div>
  );
}
