import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";

export interface Props {
  productID: string;
}

export default async function sendLike(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ total: number; product: number }> {
  const data = { productId: props.productID };

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
