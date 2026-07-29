import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import AdminEditor from "./AdminEditor";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) setError(error.message);
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
  }

  if (!supabase) {
    return (
      <Shell>
        <p className="text-[var(--muted)]">
          Supabase isn't configured. Set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> in your environment to enable the admin panel.
        </p>
      </Shell>
    );
  }

  if (checking) {
    return (
      <Shell>
        <p className="text-[var(--muted)]" style={{ fontFamily: "var(--mono)" }}>
          checking session…
        </p>
      </Shell>
    );
  }

  if (!session) {
    return (
      <Shell>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4"
        >
          <h1 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--mono)" }}>
            admin login
          </h1>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent2)] outline-none"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent2)] outline-none"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--accent)] text-black text-sm font-medium py-2 hover:brightness-110 transition disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </Shell>
    );
  }

  return <AdminEditor onLogout={handleLogout} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
      {children}
    </div>
  );
}
