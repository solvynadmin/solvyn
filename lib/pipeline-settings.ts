import { getSupabase } from "./supabase";
import { INDUSTRIES, LOCATIONS, MAX_LEADS_PER_RUN, EMAIL_TONE } from "@/pipeline.config";

export type IndustryConfig = {
  slug: string;
  label: string;
  enabled: boolean;
};

export type PipelineSettings = {
  enabled: boolean;
  industries: IndustryConfig[];
  locations: string[];
  max_leads_per_run: number;
  email_tone: string;
};

export function defaultSettings(): PipelineSettings {
  return {
    enabled: true,
    industries: INDUSTRIES.map((i) => ({ ...i, enabled: true })),
    locations: [...LOCATIONS],
    max_leads_per_run: MAX_LEADS_PER_RUN,
    email_tone: EMAIL_TONE,
  };
}

export async function getPipelineSettings(): Promise<PipelineSettings> {
  const sb = getSupabase();
  const { data } = await sb.from("pipeline_config").select("*").eq("id", 1).single();
  if (!data) return defaultSettings();
  return {
    enabled: data.enabled,
    industries: data.industries as IndustryConfig[],
    locations: data.locations as string[],
    max_leads_per_run: data.max_leads_per_run,
    email_tone: data.email_tone,
  };
}

export async function savePipelineSettings(patch: Partial<PipelineSettings>): Promise<void> {
  const sb = getSupabase();
  await sb
    .from("pipeline_config")
    .upsert({ id: 1, ...patch, updated_at: new Date().toISOString() }, { onConflict: "id" });
}
