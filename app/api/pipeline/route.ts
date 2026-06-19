import { NextRequest, NextResponse } from "next/server";
import { runPipeline } from "@/lib/pipeline-runner";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const secret = process.env.PIPELINE_SECRET;
  const header = req.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runPipeline({ force: false });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[pipeline] error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
