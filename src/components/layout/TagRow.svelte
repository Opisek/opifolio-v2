<style lang="scss">
  @import "../../styles/dimensions.scss";

  div {
    grid-area: tags;
    display: flex;
    gap: $gapSmaller;
    justify-content: start;
    flex-wrap: wrap;
    background-color: inherit;
  }
</style>

<div>
  <slot/>
</div>