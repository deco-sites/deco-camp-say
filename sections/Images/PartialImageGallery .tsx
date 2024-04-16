import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  images: ImageWidget[];
  quantRenderImages?: number;
}

export default function PartialImageGallery(
  { images, quantRenderImages = 3 }: Props,
) {
  return (
    <div>
      {images.slice(0, quantRenderImages).map((image, index) => (
        <img src={image} alt={image} class="w-28" />
      ))}

      {quantRenderImages < images.length && (
        <div>
          <button
            {...usePartialSection({
              mode: "replace",
              props: {
                images,
                quantRenderImages: quantRenderImages + 1,
              },
            })}
          >
            Veja mais
          </button>
        </div>
      )}
    </div>
  );
}
