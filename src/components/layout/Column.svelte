<script lang="ts">
  export let gap: string | null = null;
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
</style>

{#if gap}
  <div style:gap={gap}>
    <slot>
    </slot>
  </div>
{:else}
  <div>
    <slot>
    </slot>
  </div>
{/if}