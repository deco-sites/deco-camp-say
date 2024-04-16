import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";

export interface Props {
  productID: string;
}

export default async function totalLikes(
  { productID }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ product: number }> {
  const response = await fetch(`https://camp-api.deco.cx/event/${productID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
    },
  });

  return response.json();
}
