<script lang="typescript">
  import InlineButton from "./InlineButton.svelte";

  export let src: string;
  export let alt: string = "Button";
</script>

<style lang="scss">
  @import "../styles/dimensions.scss";

  img {
    width: $fontSize;
    height: $fontSize;
  }
</style>

<InlineButton on:click>
  <img src={src} alt={alt}>
</InlineButton>