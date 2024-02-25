<style lang="scss">
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $gapSmall;
    //padding: $paddingLarge 0;
    text-align: left;

    @media screen and (max-width: $screenNarrow) {
      justify-content: start;
    }
  }
</style>

<div>
  <slot>
  </slot>
</div>