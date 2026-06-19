import { getSupabase } from "./supabase";
import type { PipelineResult } from "./pipeline-runner";

export type PipelineRun = {
  id: string;
  ran_at: string;
  industry: string | null;
  location: string | null;
  leads_added: number;
  skipped: boolean;
  skip_reason: string | null;
  error: string | null;
};

export async function recordPipelineRun(result: PipelineResult): Promise<void> {
  const sb = getSupabase();

  if ("skipped" in result && result.skipped) {
    await sb.from("pipeline_runs").insert({ skipped: true, skip_reason: result.message, leads_added: 0 });
    return;
  }

  if ("companies" in result) {
    await sb.from("pipeline_runs").insert({
      leads_added: result.added,
      industry: result.industry,
      location: result.location,
      skipped: false,
    });
    return;
  }

  await sb.from("pipeline_runs").insert({
    leads_added: (result as { added: number }).added ?? 0,
    skipped: false,
  });
}

export async function getRecentRuns(limit = 10): Promise<PipelineRun[]> {
  const sb = getSupabase();
  const { data } = await sb
    .from("pipeline_runs")
    .select("*")
    .order("ran_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as PipelineRun[];
}
