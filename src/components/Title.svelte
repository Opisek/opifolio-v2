<style lang="scss">
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  h1 {
    font-family: 'Crete round', serif;
    font-size: $fontSizeTitle;
    font-weight: 700;
    margin: 0;

    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeTitleSmall;
    }
  }
</style>

<h1>
  <slot>
  </slot>
</h1>