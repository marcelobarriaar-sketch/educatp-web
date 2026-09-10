import { supabase } from "./supabase";
const pending = new Map<string, Promise<unknown>>();
export async function loadPageContent<T>(slug: string): Promise<T | null> {
  let request = pending.get(slug);
  if (!request) {
    request = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const { data, error } = await supabase
          .from("pages")
          .select("content")
          .eq("slug", slug)
          .abortSignal(controller.signal)
          .maybeSingle();
        if (error) throw error;
        return data?.content ?? null;
      } finally {
        clearTimeout(timer);
      }
    })();
    pending.set(slug, request);
    void request
      .finally(() => {
        if (pending.get(slug) === request) pending.delete(slug);
      })
      .catch(() => {});
  }
  return request as Promise<T | null>;
}
