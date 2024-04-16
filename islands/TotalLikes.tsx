import { totalLikes } from "deco-sites/deco-camp-say/sdk/useTotalLikes.tsx";
import Icon from "deco-sites/deco-camp-say/components/ui/Icon.tsx";

export default function TotalLikes() {
  return (
    <div class="flex gap-2">
      <Icon id="Friends" size={24} />
      {totalLikes.value}
    </div>
  );
}
