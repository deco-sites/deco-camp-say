import { useSignal } from "@preact/signals";
import Icon from "deco-sites/deco-camp-say/components/ui/Icon.tsx";
import { clx } from "deco-sites/deco-camp-say/sdk/clx.ts";
import { totalLikes } from "deco-sites/deco-camp-say/sdk/useTotalLikes.tsx";

interface Props {
  class?: string;
}

export function LikeButton({ class: _class }: Props) {
  const voted = useSignal(false);

  function handleClick() {
    voted.value = true;

    totalLikes.value += 1;
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      class={clx("", _class)}
    >
      {voted.value
        ? <Icon id="MoodCheck" size={24} class="text-gray-500" />
        : <Icon id="MoodSmile" size={24} class="text-primary" />}
    </button>
  );
}
