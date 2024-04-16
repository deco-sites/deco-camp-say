import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Button from "deco-sites/deco-camp-say/components/ui/Button.tsx";
import { useOffer } from "deco-sites/deco-camp-say/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/deco-camp-say/sdk/format.ts";
import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  productPage: ProductDetailsPage;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default function HorizontalProductCard(
  { productPage: { product } }: SectionProps<typeof loader>,
) {
  const mainImage = product?.image?.[0];

  const { price } = useOffer(product.offers);

  return (
    <div>
      <Image src={mainImage?.url!} width={300} loading={"lazy"} />
      <div>
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        <div class="flex lg:hidden">
          <strong>{formatPrice(price)}</strong>
          <Button href={product?.url}>Comprar</Button>
        </div>
      </div>
      <div class="hidden lg:block">
        <strong>{formatPrice(price)}</strong>
        <Button href={product?.url}>Comprar</Button>
      </div>
    </div>
  );
}

export function ErrorFallback({ error }: { error?: Error }) {
  console.error(error);
  return (
    <div class="w-full flex justify-center items-center">
      <figure>
        <Image src="/acai.jpg" width={300} />
        <figcaption>Grãos de Açaí</figcaption>
      </figure>

      <Button href="/cultura">para saber mais</Button>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <div class="skeleton w-32 h-32"></div>
      <div>
        <div class="skeleton h-4 w-20"></div>
        <div class="skeleton h-4 w-20"></div>
        <div class="flex lg:hidden">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-4 w-20"></div>
        </div>
      </div>
      <div class="hidden lg:block">
        <div class="skeleton h-4 w-20"></div>
        <div class="skeleton h-4 w-20"></div>
      </div>
    </div>
  );
}
