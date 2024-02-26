<script lang="ts">
  export let id: string | null = null;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: $gapSmaller;
    width: 100%;

    flex-wrap: wrap;

    @media(max-width: $screenNarrow) {
      flex-direction: column;
      gap: $gapSmaller;
    }
  }
</style>

<div id={id}>
  <slot>
  </slot>
</div>