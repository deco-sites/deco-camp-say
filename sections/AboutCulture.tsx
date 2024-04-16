import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature: Temperature | null;
  title: string;
  /**
   * @format textarea
   */
  description: string;
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "150px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function AboutCulture(
  { temperature, description, title }: Props,
) {
  return (
    <div class="container">
      <h2 class="text-2xl font-medium text-neutral-900">{title}</h2>
      <p class="text-neutral-500 text-justify mt-5">{description}</p>

      <p class="text-xl fixed right-3 bottom-3 p-2 text-white bg-secondary font-bold mt-4 rounded-full">
        {temperature?.celsius}°
      </p>
    </div>
  );
}
