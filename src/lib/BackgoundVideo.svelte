<script lang="ts">
  export let src: string;
</script>

<video id="my-video" controls autoplay loop muted>
  <track kind="captions" />
  <source {src} type="video/mp4" />
</video>
