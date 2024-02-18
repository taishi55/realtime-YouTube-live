<script lang="ts">
  export let profileImg = "";
  export let userName = "";
  export let message = "";
  export let isLastMessage = false;
  export let isTitle = false;
</script>

<div
  class={isTitle
    ? "wrapper wavy-background rounded-md sticky top-0 z-30"
    : "wrapper"}
>
  <div class=" flex items-start space-x-2">
    {#if profileImg}
      <img
        class="profile"
        height="1.75rem"
        width="1.75rem"
        src={profileImg}
        alt="profile pic"
      />
    {:else}
      <div
        class="profile bg-slate-500/60 flex items-center justify-center text-white font-light"
      >
        U
      </div>
    {/if}
    <p id={isLastMessage ? "container" : ""} class="flex-1">
      <span class=" font-semibold text-purple-100/80 pr-2">{userName}</span>
      {message}
    </p>
  </div>
</div>

<style lang="postcss" scoped>
  .profile {
    @apply h-7 w-7 rounded-full sticky top-12;
  }

  p {
    @apply text-white pt-[0.13rem];
  }

  .wrapper {
    @apply flex flex-col p-2;
  }

  .wavy-background {
    background: linear-gradient(
      to right,
      rgb(59 130 246 / 0.99) 0%,
      rgb(126 34 206 / 0.99) 50%,
      rgb(219 39 119 / 0.99) 100%
    );
    background-size: 400% 400%;
    animation: wave 5s infinite alternate;
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
