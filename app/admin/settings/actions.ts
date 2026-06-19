"use server";

import { revalidatePath } from "next/cache";
import { savePipelineSettings, type IndustryConfig, type Frequency } from "@/lib/pipeline-settings";

const VALID_FREQUENCIES: Frequency[] = ["daily", "twice_weekly", "weekly", "weekdays"];

export async function saveSettingsAction(formData: FormData) {
  const enabled = formData.get("enabled") === "true";
  const max_leads_per_run = Math.max(1, Math.min(20, Number(formData.get("max_leads_per_run")) || 5));
  const email_tone = (formData.get("email_tone") as string | null)?.trim() ?? "";
  const rawFreq = formData.get("frequency") as string | null;
  const frequency: Frequency = VALID_FREQUENCIES.includes(rawFreq as Frequency)
    ? (rawFreq as Frequency)
    : "weekly";

  const locationsRaw = (formData.get("locations") as string | null) ?? "";
  const locations = locationsRaw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const industriesRaw = (formData.get("industries") as string | null) ?? "[]";
  let industries: IndustryConfig[] = [];
  try {
    industries = JSON.parse(industriesRaw);
  } catch {
    industries = [];
  }

  await savePipelineSettings({ enabled, industries, locations, max_leads_per_run, email_tone, frequency });
  revalidatePath("/admin/settings");
}
