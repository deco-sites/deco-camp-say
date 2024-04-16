import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Button from "deco-sites/deco-camp-say/components/ui/Button.tsx";
import { useOffer } from "deco-sites/deco-camp-say/sdk/useOffer.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { formatPrice } from "deco-sites/deco-camp-say/sdk/format.ts";
import { AppContext } from "deco-sites/deco-camp-say/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { clx } from "deco-sites/deco-camp-say/sdk/clx.ts";

export interface Props {
  productPage: ProductDetailsPage;
  maxWidth?:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  animateImage?: boolean;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default function HorizontalProductCard(
  { productPage: { product }, maxWidth = "max-w-5xl", animateImage = true }:
    SectionProps<
      typeof loader
    >,
) {
  const mainImage = product?.image?.[0];

  const { offers, productID, url, name } = product;

  const { price, listPrice, seller } = useOffer(product.offers);
  const eventParams = {
    items: [{ item_url: url, quantity: 1, item_name: name! }],
  };

  return (
    <div
      class={clx(
        "card bg-base-100 p-5 overflow-hidden shadow-xl mx-auto flex flex-row gap-2",
        maxWidth,
      )}
    >
      <div class="overflow-hidden">
        <Image
          src={mainImage?.url!}
          width={200}
          height={280}
          loading={"lazy"}
          class={clx(
            "aspect-square h-full",
            animateImage && "hover:scale-110 transition",
          )}
        />
      </div>
      <div class="flex flex-col gap-6 text-neutral-600">
        <h2 class="text-lg lg:text-2xl line-clamp-1">{product?.name}</h2>
        <p class="text-base lg:text-xl line-clamp-1">{product?.description}</p>
        <div class="flex flex-col items-start sm:flex-row sm:items-center gap-3 lg:hidden">
          <div class="flex flex-col">
            <div class="line-through text-xs font-light">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </div>
            <div class="text-base-content lg:text-sm font-bold">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          <AddToCartButtonVTEX
            eventParams={eventParams}
            productID={productID}
            seller={seller ?? "1"}
          />
        </div>
      </div>
      <div class="hidden lg:flex ml-auto flex-col gap-2">
        <div class="line-through text-xs font-light">
          {formatPrice(listPrice, offers?.priceCurrency)}
        </div>
        <div class="text-base-content lg:text-sm font-bold">
          {formatPrice(price, offers?.priceCurrency)}
        </div>
        <AddToCartButtonVTEX
          eventParams={eventParams}
          productID={productID}
          seller={seller ?? "1"}
        />
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
    <div
      class={clx(
        "card max-w-5xl p-5 shadow-xl mx-auto flex flex-row gap-2",
      )}
    >
      <div class="overflow-hidden">
        <div class="skeleton w-[200px] h-[280px]"></div>
      </div>
      <div class="flex w-full max-w-96 flex-col gap-6 text-neutral-600">
        <div class="skeleton h-5 w-full"></div>
        <div class="skeleton h-20 w-full"></div>
        <div class="flex flex-col items-start sm:flex-row sm:items-center gap-3 lg:hidden">
          <div class="flex flex-col">
            <div class="skeleton h-5 w-full max-w-28"></div>
            <div class="skeleton h-5 w-full max-w-28"></div>
          </div>
          <div class="skeleton h-11 w-full"></div>
        </div>
      </div>
      <div class="hidden max-w-32 w-full lg:flex ml-auto flex-col gap-2">
        <div class="skeleton h-5 w-full max-w-28"></div>
        <div class="skeleton h-5 w-full max-w-28"></div>

        <div class="skeleton h-11 w-full"></div>
      </div>
    </div>
  );
}
