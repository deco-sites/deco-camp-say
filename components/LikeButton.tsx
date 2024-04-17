import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Icon from "deco-sites/deco-camp-say/components/ui/Icon.tsx";
import { clx } from "deco-sites/deco-camp-say/sdk/clx.ts";
import { totalLikes } from "deco-sites/deco-camp-say/sdk/useTotalLikes.tsx";
import { invoke } from "deco-sites/deco-camp-say/runtime.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ComponentType } from "preact";

interface Props {
  class?: string;
  productID: string;
}

export function LikeButton({ class: _class, productID }: Props) {
  const voted = useSignal(false);
  const totalProductLikes = useSignal(0);

  const Toast = ToastContainer as ComponentType;

  async function handleClick() {
    voted.value = true;

    const { product, total } = await invoke["deco-sites/deco-camp-say"].actions
      .sendLike({
        productID,
      });

    totalLikes.value = total;
    totalProductLikes.value = product;

    toast.success("Curtido!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }

  async function getVote() {
    const { product } = await invoke["deco-sites/deco-camp-say"].loaders
      .productVotes({ productID });

    totalProductLikes.value = product;
  }

  useEffect(() => {
    getVote();
    const intervalID = setInterval(getVote, 30000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <button
      onClick={handleClick}
      type="button"
      class={clx("flex gap-2 items-center", _class)}
    >
      {voted.value
        ? <Icon id="MoodCheck" size={24} class="text-gray-500" />
        : <Icon id="MoodSmile" size={24} class="text-primary" />}

      <span>{totalProductLikes.value}</span>

      <Toast />
    </button>
  );
}
