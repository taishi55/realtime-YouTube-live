<script lang="ts">
  import { isTalking } from "./store";
  import { doc, onSnapshot, getFirestore } from "firebase/firestore";
  import { app } from "$lib/config";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let audio: any = null;

  onMount(async () => {
    const db = getFirestore(app);

    onSnapshot(doc(db, "setting", "audio"), async (doc) => {
      const data = doc.data();

      if (data?.play) {
        setVolume(0.2);
      } else {
        setVolume(0.8);
      }

      if (data?.play && data?.isGirl) {
        isTalking.set(true);
      } else {
        isTalking.set(false);
      }
    });
  });

  const setVolume = (volume: number) => {
    const audio = document.querySelector("audio");
    if (audio?.volume && browser) {
      audio.volume = volume;
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  onMount(async () => {
    await delay(4000);
    const audio = document.querySelector("audio");
    if (audio) {
      audio.addEventListener("pause", function () {
        audio.load();
      });

      audio.addEventListener("canplaythrough", function () {
        audio.play();
      });
    }
  });

  let musicSrc =
    "https://stream.mubert.com/b2b/v2?playlist=6.4.0&intensity=medium&pat=bXViZXJ0Zm9yc3RyZWFtZXJzLjE4NjgxNzM5LjAzZTgxNTg5NzJmMWMzM2IxM2Y2ZDVlOWQ2ZWI3MTdkYTNkOTM3NTcuMS4z.08deb4725ee7f6ef03af2e32710389590d00a48e6d3380897b448242675b72d9";
</script>

<div
  class=" fixed left-0 bottom-4 w-full h-16 lg:opacity-0 hover:opacity-100 transition-opacity duration-1000"
>
  <audio class="mx-auto" controls
    ><source src={musicSrc} type="audio/mpeg" /></audio
  >
</div>
