import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  /**
   * @title Desktop
   */
  desktop: {
    /**
     * @title Espaçamento no desktop
     * @description Tamanho do espaçamento em pixels
     */
    height: number;
  };
  /**
   * @title Mobile
   */
  mobile: {
    /**
     * @title Espaçamento no mobile
     * @description Tamanho do espaçamento em pixels
     */
    height: number;
  };
}

export function Separator(
  { desktop, mobile, device }: SectionProps<typeof loader>,
) {
  if (device === "mobile") {
    return (
      <div
        className="w-full"
        style={{ height: `${mobile.height}px` }}
      />
    );
  }

  return (
    <div
      className="w-full"
      style={{ height: `${desktop.height}px` }}
    />
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Separator;
