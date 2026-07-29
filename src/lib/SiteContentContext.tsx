import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";
import { defaultContent, type SiteContent } from "../data/content";

type SiteContentState = {
  content: SiteContent;
  loading: boolean;
  isLive: boolean; // true if data came from Supabase rather than fallback
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentState | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchContent = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .single();

    if (!error && data?.data) {
      setContent(data.data as SiteContent);
      setIsLive(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <SiteContentContext.Provider
      value={{ content, loading, isLive, refresh: fetchContent }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return ctx;
}
