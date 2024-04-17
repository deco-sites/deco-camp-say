import { MatchContext } from "deco/blocks/matcher.ts";

interface Props {
  campaign: string;
}

export default function Utm({ campaign }: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);

  return url.searchParams.get("utmcampaign") === campaign;
}
