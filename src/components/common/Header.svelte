<script lang="ts">
  export let level: number;
  export let id: string = "";
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Crete round', serif;
    font-weight: 700;
    margin: 0;
  }

  h1 {
    font-size: $fontSizeTitle;
    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeTitleSmall;
    }
  }

  h2 {
    font-size: $fontSizeTitleSmall;
    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeTitleSmaller;
    }
  }

  h3 {
    font-size: $fontSizeTitleSmaller;
    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSize;
    }
  }
</style>

{#if id}
  <svelte:element this={"h"+level.toString()} id={id}>
    <slot>
    </slot>
  </svelte:element>
{:else}
  <svelte:element this={"h"+level.toString()}>
    <slot>
    </slot>
  </svelte:element>
{/if}