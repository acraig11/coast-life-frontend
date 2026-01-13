export interface Env {
  GEMINI_API_KEY: string;
  // Optional: if you want to restrict CORS to your site:
  // ALLOWED_ORIGIN: string;
}

type ChatRequest = {
  message: string;
  // optional: pass prior turns if you want multi-turn context
  history?: Array<{ role: "user" | "model"; text: string }>;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Basic routing
    if (url.pathname === "/api/chat" && request.method === "OPTIONS") {
      return corsResponse(null, 204, request /*, env*/);
    }
    if (url.pathname !== "/api/chat") {
      return new Response("Not found", { status: 404 });
    }
    if (request.method !== "POST") {
      return corsResponse({ error: "Method not allowed" }, 405, request /*, env*/);
    }

    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return corsResponse({ error: "Invalid JSON" }, 400, request /*, env*/);
    }

    if (!body?.message?.trim()) {
      return corsResponse({ error: "Missing message" }, 400, request /*, env*/);
    }

    // Build Gemini "contents" format
    const contents = [
      ...(body.history ?? []).map((t) => ({
        role: t.role,
        parts: [{ text: t.text }],
      })),
      {
        role: "user",
        parts: [{ text: body.message }],
      },
    ];

    // Gemini REST endpoint
    // (Model name can be changed later)
    const model = "gemini-2.5-flash";
    const geminiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const geminiResp = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Keep key out of query string; use header
        "x-goog-api-key": env.GEMINI_API_KEY,
      },
      body: JSON.stringify({ contents }),
    });

    const data = await geminiResp.json().catch(() => null);

    if (!geminiResp.ok) {
      return corsResponse(
        { error: "Gemini request failed", status: geminiResp.status, details: data },
        502,
        request /*, env*/
      );
    }

    // Extract plain text (best-effort)
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ??
      "";

    return corsResponse({ reply }, 200, request /*, env*/);
  },
};

function corsResponse(
  json: any,
  status: number,
  request: Request
  // env?: Env
) {
  const origin = request.headers.get("Origin") || "*";

  // If you want to lock this down, replace "*" with your real site origin
  // e.g. const allowed = env?.ALLOWED_ORIGIN ?? "";
  // and check origin === allowed
  const headers: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };

  return new Response(json === null ? null : JSON.stringify(json), { status, headers });
}
