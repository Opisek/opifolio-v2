<script lang="ts">
  export let level: number;
  export let id: string = "";
  export let nomargin: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Crete round', serif;
    font-weight: $fontWeightTitle;
    color: $emphasisForeground;
    margin: $paddingSmall 0 0 0;
  }

  h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child, .nomargin {
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

<svelte:element this={"h"+level.toString()} id={id || null} class:nomargin={nomargin}>
  <slot>
  </slot>
</svelte:element>