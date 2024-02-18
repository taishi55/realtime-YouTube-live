<script lang="ts">
  import CommentWindow from "$lib/CommentWindow.svelte";
  import MusicPlayer from "$lib/MusicPlayer.svelte";
  import Nav from "$lib/Nav.svelte";
  import { isTalking } from "$lib/store";
  import talking from "$lib/lofi-talking.mp4";
  import notTalking from "$lib/lofi-not-talking.mp4";
  import BackgoundVideo from "$lib/BackgoundVideo.svelte";
  import RankWindow from "$lib/RankWindow.svelte";
  import TextToSpeech from "$lib/TextToSpeech.svelte";
</script>

<div class=" relative w-full h-screen">
  <div class={$isTalking ? "absolute top-0 left-0 w-full" : "opacity-0"}>
    <BackgoundVideo src={talking} />
  </div>
  <div class={!$isTalking ? "absolute top-0 left-0 w-full" : "opacity-0"}>
    <BackgoundVideo src={notTalking} />
  </div>
</div>

<div
  class="fixed top-0 left-0 px-5 pt-5 pb-28 w-full flex flex-col space-y-6 h-screen normal-font"
>
  <Nav />
  <div class=" flex justify-between items-start">
    <RankWindow />
    <CommentWindow />
  </div>
</div>

<TextToSpeech />

<MusicPlayer />
