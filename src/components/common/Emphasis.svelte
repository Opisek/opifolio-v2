<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  em {
    font-style: italic;
    color: $emphasisForeground;
    //font-weight: $fontWeightEmphasis;
    letter-spacing: $fontSpacingEmphasis;
  }
</style>

<em>
  <slot/>
</em>