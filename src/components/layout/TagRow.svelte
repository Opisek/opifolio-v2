<script lang="ts">
  export let right: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  div {
    grid-area: tags;
    display: flex;
    gap: $gapSmaller;
    justify-content: start;
    flex-wrap: wrap;
    background-color: inherit;
    height: fit-content;
  }

  div.right {
    justify-content: end;
  }
</style>

<div class:right={right}>
  <slot/>
</div>