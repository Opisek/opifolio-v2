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

    scroll-margin-top: calc($navbarHeight / 1em * $fontSize);
    @media screen and (max-width: $screenNarrow) {
      scroll-margin-top: calc($navbarHeightSmall / 1em * $fontSize);
    }
  }

  h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child,
  .nomargin,
  :global(h1) + h2, :global(h2) + h3, :global(h3) + h4, :global(h4) + h5, :global(h5) + h6 {
    margin: 0 !important;
  }

  $fontSizes: (
    $fontSizeTitle,
    $fontSizeTitleSmall,
    $fontSizeTitleSmaller,
    $fontSize
  );

  @for $i from 1 through length($fontSizes) - 1 {
    h#{$i} {
      font-size: nth($fontSizes, $i);

      @media screen and (max-width: $screenNarrow) {
        font-size: nth($fontSizes, $i + 1);
      }
    }
  }
</style>

<svelte:element this={"h"+level.toString()} id={id || null} class:nomargin={nomargin}>
  <slot>
  </slot>
</svelte:element>