<script lang="ts">
  import { lazyLoad } from "../../lib/client/lazyLoad";

  import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../lib/common/values";

  export let lazy: boolean = true;

  export let src: string;
  export let alt: string;

  let loaded = false;

  const search = new URLSearchParams(src);
  const widthRaw = search.get("w");
  const width = widthRaw ? Number.parseInt(widthRaw) | DEFAULT_WIDTH : DEFAULT_WIDTH;
  const heightRaw = search.get("h");
  const height = heightRaw ? Number.parseInt(heightRaw) | DEFAULT_HEIGHT : DEFAULT_HEIGHT;

  function onload() {
    loaded = true;
  }

  // TODO: this approach does not transition the image smoothly
  // TODO: figure out a way to have nice transitions here
  $: changeSrc(src);
  function changeSrc(src: string) {
    lazy = !lazy;
    setTimeout(() => {
      lazy = !lazy;
    }, 0);
 }

</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  img.loading {
    opacity: 0;
    transform: translateY($paddingSmall);
  }
</style>

{#if lazy}
  <img
    alt={alt}
    on:load={onload}
    use:lazyLoad={src}
    class:loading={!loaded}
    {...$$restProps}
  />
{:else}
  <img
    alt={alt}
    src={src}
    {...$$restProps}
  />
{/if}