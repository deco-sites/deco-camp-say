import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Button from "deco-sites/deco-camp-say/components/ui/Button.tsx";
import { useOffer } from "deco-sites/deco-camp-say/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/deco-camp-say/sdk/format.ts";

export interface MyProduct {
  productPage: ProductDetailsPage;
}

export default function HorizontalProductCard(
  { productPage: { product } }: MyProduct,
) {
  const mainImage = product?.image?.[0];

  const { price } = useOffer(product.offers);

  return (
    <div>
      <Image src={mainImage?.url!} width={300} loading={"lazy"} />
      <div>
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
      </div>
      <div>
        <strong>{formatPrice(price)}</strong>
        <Button href={product?.url}>Comprar</Button>
      </div>
    </div>
  );
}
