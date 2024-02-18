<script lang="ts">
  import TipMessage from "./TipMessage.svelte";
</script>

<nav class="flex items-center justify-between">
  <div title="logo" class="pl-5 text-white text-3xl lg:text-5xl logo-font">
    LofiGPT
  </div>

  <TipMessage />

  <a
    href="https://www.buymeacoffee.com/phantom.writer"
    target="_blank"
    class=" w-fit h-12 wavy-background px-3 rounded-md flex items-center"
    rel="noreferrer"
  >
    <div
      class="whitespace-nowrap flex items-center space-x-3 italic text-xl text-orange-900 font-bold"
    >
      <i class="fa-solid fa-envelope text-2xl text-orange-900" />
      <div class="coffee-font">Buy me Super Chats</div>
    </div>
  </a>
</nav>

<style lang="postcss" scoped>
  .wavy-background {
    background: linear-gradient(
      to right,
      #fef08a 0%,
      #facc15 50%,
      #fef08a 100%
    );
    background-size: 400% 400%;
    animation: wave 3s infinite alternate;
  }

  @keyframes wave {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
</style>
