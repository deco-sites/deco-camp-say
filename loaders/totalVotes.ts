import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";

export default async function totalLikes(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<{ total: number }> {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
    },
  });

  return response.json();
}
