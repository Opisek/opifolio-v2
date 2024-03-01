<script lang="ts">
  import InlineButton from "./InlineButton.svelte";

  export let src: string;
  export let alt: string = "Button";

  export let spin: number = 360;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  img {
    width: $fontSize;
    height: $fontSize;
    user-select: none;
  }
</style>

<InlineButton on:click spin={spin}>
  <img src={src} alt={alt}>
</InlineButton>