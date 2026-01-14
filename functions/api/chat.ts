export async function onRequestPost({ request }: { request: Request }) {
  // Your existing worker endpoint (leave it exactly as-is)
  const upstream = "https://gemini-proxy.zinadog99.workers.dev/api/chat";

  // Forward request body
  const body = await request.text();

  const res = await fetch(upstream, {
    method: "POST",
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
    },
    body,
  });

  // Return worker response
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}
