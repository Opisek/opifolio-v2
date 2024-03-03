<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  div {
    color: $fadedForeground;
    margin: 0 $paddingSmall;
    padding: $paddingSmall;
    border-left: solid $fadedForeground $borderWidth;
  }
</style>

<div>
  <slot>Lorem Impsum</slot>
</div>