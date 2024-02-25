<style lang="scss">
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: $gapSmaller;
    width: 100%;

    @media(max-width: $screenNarrow) {
      flex-direction: column;
      gap: $gapSmaller;
    }
  }
</style>

<div>
  <slot>
  </slot>
</div>