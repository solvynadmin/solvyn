import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getPipelineSettings } from "@/lib/pipeline-settings";

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

  // 3. Basic Claude call (no web search)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    checks.claude_basic = { error: "No API key" };
    return NextResponse.json(checks);
  }

  const client = new Anthropic({ apiKey });

  try {
    const basic = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      messages: [{ role: "user", content: 'Reply with the single word "ok".' }],
    });
    checks.claude_basic = {
      ok: true,
      response: (basic.content[0] as Anthropic.TextBlock).text,
    };
  } catch (err) {
    checks.claude_basic = { error: String(err) };
  }

  // 4. Claude with web search — small test
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tools: any[] = [{ type: "web_search_20250305", name: "web_search" }];
    const messages: Anthropic.MessageParam[] = [{
      role: "user",
      content: 'Use web search to find one small independent HVAC company in Phoenix AZ (not a chain). Return their name and website as JSON: {"name":"...","website":"..."}',
    }];

    let finalText = "";
    let rounds = 0;

    for (let i = 0; i < 6; i++) {
      rounds++;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = {
        model: "claude-sonnet-4-6",
        max_tokens: 512,
        tools,
        messages,
        ...(i === 0 ? { tool_choice: { type: "any" } } : {}),
      };
      const res = await client.messages.create(params);

      if (res.stop_reason === "end_turn") {
        const tb = res.content.find((b) => b.type === "text");
        finalText = tb ? (tb as Anthropic.TextBlock).text : "";
        break;
      }

      if (res.stop_reason === "tool_use") {
        const tubs = res.content.filter((b) => b.type === "tool_use") as Anthropic.ToolUseBlock[];
        messages.push({ role: "assistant", content: res.content });
        messages.push({
          role: "user",
          content: tubs.map((tu) => ({ type: "tool_result" as const, tool_use_id: tu.id, content: "Search done." })),
        });
      }
    }

    checks.claude_web_search = { ok: true, rounds, raw_response: finalText.slice(0, 500) };
  } catch (err) {
    checks.claude_web_search = { error: String(err) };
  }

  return NextResponse.json(checks, { status: 200 });
}
