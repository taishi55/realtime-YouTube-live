<script lang="ts">
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { getFirestore, doc, onSnapshot } from "firebase/firestore";
  import { app } from "./config";

  let superchat = {
    userName: "",
    tipAmount: "",
  };

  onMount(() => {
    const db = getFirestore(app);

    onSnapshot(doc(db, "setting", "superchat"), async (doc) => {
      const data = doc.data();
      if (data?.userName) {
        superchat.userName = data.userName;
        superchat.tipAmount = data.tipAmount;

        setTimeout(() => {
          superchat.userName = "";
        }, 3500);
      }
    });
  });
</script>

{#if superchat.userName}
  <div
    in:fly={{ duration: 1500, y: -20 }}
    class="rounded-md flex space-x-3 whitespace-nowrap window-bg-color truncate items-center text-xl text-white backdrop-blur-xl py-2 px-4"
  >
    <div class=" truncate font-semibold text-slate-300 max-w-xs">
      {superchat.userName}
    </div>
    <div>tipped {superchat.tipAmount}</div>
    <div
      class=" bg-gradient-to-br from-pink-300 to-yellow-300 bg-clip-text text-transparent italic"
    >
      Thank you!💫⭐️
    </div>
  </div>
{/if}
