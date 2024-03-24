<script lang="ts">
  import LazyImage from "./LazyImage.svelte";

  export let src: string;
  export let alt: string = "Image";
  
  export let style: string = "circle";
</script>

<style lang="scss">
  div {
    height: 100%;
    width: 100%;
    text-align: center;
  }

  div :global(> img) {
    width: 100%;
    height: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    max-width: 20vw;
  }

  div :global(> img.circle) {
    border-radius: 50%;
  }
</style>

<div>
  <LazyImage src={src} alt={alt} class={style}/>
</div>