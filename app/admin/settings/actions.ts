"use server";

import { revalidatePath } from "next/cache";
import { savePipelineSettings, type IndustryConfig } from "@/lib/pipeline-settings";

export async function saveSettingsAction(formData: FormData) {
  const enabled = formData.get("enabled") === "true";
  const max_leads_per_run = Math.max(1, Math.min(20, Number(formData.get("max_leads_per_run")) || 5));
  const email_tone = (formData.get("email_tone") as string | null)?.trim() ?? "";

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

  await savePipelineSettings({ enabled, industries, locations, max_leads_per_run, email_tone });
  revalidatePath("/admin/settings");
}
