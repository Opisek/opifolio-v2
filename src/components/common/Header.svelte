<script lang="ts">
  export let level: number;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  h1, h2, h3, span {
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

{#if level == 1}
  <h1>
    <slot>
    </slot>
  </h1>
{:else if level == 2}
  <h2>
    <slot>
    </slot>
  </h2>
{:else if level == 3}
  <h3>
    <slot>
    </slot>
  </h3>
{:else}
  <span>
    <slot>
    </slot>
  </span>
{/if}