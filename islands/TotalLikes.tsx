import { totalLikes } from "deco-sites/deco-camp-say/sdk/useTotalLikes.tsx";
import Icon from "deco-sites/deco-camp-say/components/ui/Icon.tsx";
import { useEffect } from "preact/hooks";
import { invoke } from "deco-sites/deco-camp-say/runtime.ts";

export default function TotalLikes() {
  async function getVotes() {
    const { total } = await invoke["deco-sites/deco-camp-say"].loaders
      .totalVotes();

    totalLikes.value = total;
  }

  useEffect(() => {
    getVotes();

    const intervalID = setInterval(getVotes, 30000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div class="flex gap-2">
      <Icon id="Friends" size={24} />
      {totalLikes.value}
    </div>
  );
}
