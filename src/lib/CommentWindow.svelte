<script lang="ts">
  import { onMount } from "svelte";
  import Comment from "./Comment.svelte";
  import LiveIcon from "./LiveIcon.svelte";
  import lofiProfile from "./lofi-profile.png";
  import { getFirestore, doc, onSnapshot } from "firebase/firestore";
  import { app } from "./config";
  import { chats } from "./store";

  const scrollToBottom = () => {
    // scroll to the next line
    const container = document.getElementById("chat-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  onMount(() => {
    const db = getFirestore(app);

    onSnapshot(doc(db, "message", "comment"), async (doc) => {
      const data = doc.data();

      if (data?.message && !$chats.some((m) => m.message === data?.message)) {
        if ($chats.length > 3) {
          $chats.shift();
          $chats = $chats;
        }
        $chats.push({
          isLofi: false,
          isLastMessage: false,
          message: data.message,
          userName: data.userName,
          profileImg: data.profileImg,
        });
        $chats = $chats;

        setTimeout(() => {
          scrollToBottom();
        }, 200);
      }
    });

    onSnapshot(doc(db, "message", "chatgpt"), async (doc) => {
      const data = doc.data();
      if (data?.message && !$chats.some((m) => m.message === data?.message)) {
        if ($chats.length > 3) {
          $chats.shift();
          $chats = $chats;
        }
        $chats.push({
          isLofi: true,
          isLastMessage: true,
          message: data.message.replace(/\blofi\s*girl\b/gi, "LofiGPT"),
          userName: "LofiGPT",
          profileImg: lofiProfile,
        });
        $chats = $chats;

        setTimeout(() => {
          scrollToBottom();
        }, 200);
      }
    });
  });
</script>

<div
  class="backdrop-blur-md h-full overflow-y-auto scroll-smooth flex flex-col window-bg-color rounded-lg max-w-sm w-full px-4 pb-4 pt-5 relative"
>
  <LiveIcon />
  <div
    id="chat-container"
    class="h-[10rem] overflow-y-auto scroll-smooth flex flex-col"
  >
    <Comment
      isTitle={true}
      profileImg={lofiProfile}
      message="Let's talk on YouTube LIVE Chat 😊"
    />
    <div class="flex flex-col py-1">
      {#each $chats as item, index}
        <Comment
          isLastMessage={$chats.length - 1 === index}
          message={item.message}
          profileImg={item.profileImg}
          userName={item.userName}
        />
      {/each}
    </div>
  </div>
</div>
