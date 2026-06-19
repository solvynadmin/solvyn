type SerperResult = {
  title: string;
  link: string;
  snippet: string;
};

type SerperResponse = {
  organic?: SerperResult[];
  knowledgeGraph?: { title?: string; website?: string; description?: string };
};

export async function searchWeb(query: string): Promise<string> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error("SERPER_API_KEY not set");

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, num: 10, gl: "us", hl: "en" }),
  });

  if (!res.ok) throw new Error(`Serper error: ${res.status}`);

  const data: SerperResponse = await res.json();
  const results = data.organic ?? [];

  if (!results.length) return "No search results found.";

  return results
    .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.link}\n${r.snippet}`)
    .join("\n\n");
}
