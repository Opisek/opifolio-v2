<script lang="ts">
  export let narrow: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $gapSmall;
    text-align: left;

    @media screen and (max-width: $screenNarrow) {
      justify-content: start;
    }
  }

  div.narrow {
    gap: $gapSmaller;
  }
</style>

<div class:narrow={narrow}>
  <slot>
  </slot>
</div>