import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getPipelineSettings } from "@/lib/pipeline-settings";
import { searchWeb } from "@/lib/search";

export const maxDuration = 60;

function authOk(req: NextRequest) {
  const secret = process.env.PIPELINE_SECRET;
  return secret && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authOk(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const checks: Record<string, unknown> = {};

  // 1. Env vars
  checks.env = {
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    PIPELINE_SECRET: !!process.env.PIPELINE_SECRET,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    SERPER_API_KEY: !!process.env.SERPER_API_KEY,
  };

  // 2. Settings from DB
  try {
    const settings = await getPipelineSettings();
    checks.settings = {
      enabled: settings.enabled,
      frequency: settings.frequency,
      activeIndustries: settings.industries.filter((i) => i.enabled).map((i) => i.label),
      locations: settings.locations,
      max_leads_per_run: settings.max_leads_per_run,
    };
  } catch (err) {
    checks.settings = { error: String(err) };
  }

  // 3. Serper search test
  try {
    const results = await searchWeb("HVAC contractors Phoenix AZ small business independent");
    checks.serper = { ok: true, preview: results.slice(0, 400) };
  } catch (err) {
    checks.serper = { error: String(err) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    checks.haiku = { error: "No ANTHROPIC_API_KEY" };
    checks.sonnet = { error: "No ANTHROPIC_API_KEY" };
    return NextResponse.json(checks);
  }

  const client = new Anthropic({ apiKey });

  // 4. Haiku extraction test (cheap — tests business extraction step)
  try {
    const serperPreview =
      typeof (checks.serper as { preview?: string }).preview === "string"
        ? (checks.serper as { preview: string }).preview
        : "No Serper results available.";

    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: `Extract 1 small business from these search results and return JSON:
${serperPreview}

Return only: [{"company_name":"...","website_url":"...","first_name":"there","recipient_email":null,"phone":null}]`,
        },
      ],
    });
    const text = (res.content[0] as Anthropic.TextBlock).text;
    checks.haiku = { ok: true, response: text.slice(0, 300) };
  } catch (err) {
    checks.haiku = { error: String(err) };
  }

  // 5. Sonnet test (tests email drafting step)
  try {
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      messages: [{ role: "user", content: 'Reply with only the word "ok".' }],
    });
    checks.sonnet = {
      ok: true,
      response: (res.content[0] as Anthropic.TextBlock).text,
    };
  } catch (err) {
    checks.sonnet = { error: String(err) };
  }

  return NextResponse.json(checks, { status: 200 });
}
