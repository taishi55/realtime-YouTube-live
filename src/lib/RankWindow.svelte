<script lang="ts">
  import { onMount } from "svelte";
  import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    orderBy,
    limit,
  } from "firebase/firestore";
  import { app } from "./config";

  let customers: any[] = [];
  onMount(async () => {
    const db = getFirestore(app);
    const q = query(
      collection(db, "customers"),
      orderBy("tipAmount", "desc"),
      limit(10)
    );
    onSnapshot(q, (querySnapshot) => {
      customers = [];
      querySnapshot.forEach((doc) => {
        customers = [...customers, doc.data()];
      });
    });
  });
</script>

<div
  class="backdrop-blur-sm window-bg-color rounded-lg max-w-xs w-full py-4 relative"
>
  <div class="h-fit flex flex-col space-y-3 text-white px-2">
    <div class="flex space-x-2 whitespace-nowrap truncate px-2">
      <div>Highest Tip:</div>
      {#if customers.length > 0}
        <span class=" text-green-500 truncate">{customers.at(0).userName}</span>
        <span class="text-green-500"
          >👑 ({Intl.NumberFormat("en", { notation: "compact" }).format(
            customers.at(0).tipAmount
          )})</span
        >
      {/if}
    </div>
    <div class="space-y-1 px-2">
      {#each customers.slice(1, customers.length) as customer, index}
        <div class="flex space-x-2 whitespace-nowrap truncate font-light">
          <div>
            {index + 2}.
          </div>
          <div class=" truncate">{customer.userName}</div>
          <div>
            🏅 ({Intl.NumberFormat("en", { notation: "compact" }).format(
              customer.tipAmount
            )})
          </div>
        </div>
      {/each}
    </div>

    <div class="message-box">
      Menu: prioritized reply (2 ~), make my day ✨ (400)
    </div>

    <div class="message-box">
      <span class="text-xl not-italic animate-pulse">🚨</span> Heyy! So, I'm gonna
      be checking out the latest comments on my YouTube Live Chat. I'm super excited
      to see what you guys have to say! Just drop your comment down below and I'll
      randomly choose one to reply to. Can't wait to talk with you!
    </div>

    <div class=" text-xs font-extralight italic flex items-start space-x-2">
      <div>Created by</div>
      <div class=" relative flex-1">
        <div class="first absolute top-0 left-0">Satoshi Nakamoto</div>
        <div class="second absolute top-0 left-0 space-x-[2px]">
          <span class=" tracking-[0.1rem]">Taishi</span><span
            class="tracking-[0.019rem]">Nammoto</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss" scoped>
  .message-box {
    @apply text-sm italic font-light bg-pink-900/20 px-2 py-1 rounded-md w-full;
  }

  .first {
    opacity: 1;
    animation: fade-in-out-line 35s ease-in-out forwards infinite;
  }

  .second {
    opacity: 0;
    animation: fade-in-out 35s ease-in-out forwards infinite;
  }

  @keyframes fade-in-out {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-in-out-line {
    0% {
      opacity: 0;
      text-decoration-line: line-through;
    }
    50% {
      opacity: 1;
      text-decoration-line: line-through;
    }
    100% {
      opacity: 0;
      text-decoration-line: line-through;
    }
  }
</style>
