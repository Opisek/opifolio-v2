<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  b {
    font-family: 'Crete round', serif;
    font-weight: $fontWeightTitle;
    color: $emphasisForeground;
    margin: $paddingSmall 0 0 0;
  }
</style>

<b>
  <slot/>
</b>