import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "deco-sites/deco-camp-say/components/ui/Button.tsx";

export interface Props {
  images: ImageWidget[];
  quantRenderImages?: number;
}

export default function PartialImageGallery(
  { images, quantRenderImages = 3 }: Props,
) {
  return (
    <div class="mx-auto max-w-[865px]">
      <div class="flex flex-wrap gap-3">
        {images.slice(0, quantRenderImages).map((image, index) => (
          <Image
            src={image}
            width={280}
            height={190}
            class="rounded-xl hover:scale-110 transition"
          />
        ))}
      </div>

      {quantRenderImages < images.length && (
        <Button
          class="mx-auto mt-3 bg-primary block"
          {...usePartialSection({
            mode: "replace",
            props: {
              images,
              quantRenderImages: quantRenderImages + 1,
            },
          })}
        >
          Veja mais
        </Button>
      )}
    </div>
  );
}
