import { useEffect, useRef } from "react";
import { useSiteContent } from "../lib/SiteContentContext";
import { SectionEyebrow } from "./Toolchain";

// Minimal Cal.com embed loader (official snippet, adapted).
// Docs: https://cal.com/docs/embeds
function loadCalEmbed(): Promise<any> {
  return new Promise((resolve) => {
    const w = window as any;
    if (w.Cal) {
      resolve(w.Cal);
      return;
    }
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function (...ar: any[]) {
          let cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = [] as any[];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...apiAr: any[]) {
              p(api, apiAr);
            };
            const namespace = ar[1];
            api.q = [] as any[];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(w, "https://app.cal.com/embed/embed.js", "init");

    const check = setInterval(() => {
      if (w.Cal) {
        clearInterval(check);
        resolve(w.Cal);
      }
    }, 50);
  });
}

export default function Booking() {
  const { content, loading } = useSiteContent();
  const { profile } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (loading || initialized.current) return;
    initialized.current = true;

    loadCalEmbed().then((Cal) => {
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-inline-embed",
        calLink: profile.calUsername,
        layout: "month_view",
        config: { theme: "dark" },
      });
      Cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#f2a93c" } },
        hideEventTypeDetails: false,
      });
    });
  }, [loading, profile.calUsername]);

  return (
    <section id="booking" className="border-b border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionEyebrow label="schedule" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
          Book a call
        </h2>
        <p className="text-[var(--muted)] mb-8 max-w-xl">
          Pick a slot below — availability updates in real time. Replace{" "}
          <code
            className="text-[var(--accent)]"
            style={{ fontFamily: "var(--mono)" }}
          >
            calUsername
          </code>{" "}
          in <code style={{ fontFamily: "var(--mono)" }}>src/data/content.ts</code> with
          your Cal.com handle to activate this.
        </p>

        <div
          ref={containerRef}
          id="cal-inline-embed"
          className="w-full min-h-[560px] rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
        />
      </div>
    </section>
  );
}
