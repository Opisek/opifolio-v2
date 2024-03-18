<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  span {
    @import "../../styles/media.scss";

    color: $fadedForeground;
    padding: $paddingSmall;
    border-left: solid $fadedForeground $borderWidth;

    @media screen and (min-width: $screenNarrow) {
      margin: 0 $paddingSmall;
    }
  }
</style>

<span>
  <slot>Lorem Impsum</slot>
</span>