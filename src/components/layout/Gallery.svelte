<script>
    import Center from "./Center.svelte";

</script>
<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    grid-gap: $gapSmall;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: $screenNarrow) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax($cardWidth, 1fr));
      grid-auto-rows: 1fr;

      align-items: stretch;
    }

    @media screen and (max-width: $screenNarrow) {
      display: flex;
      flex-direction: column;

      align-items: center;
    }
  } 
</style>

<Center>
  <div>
    <slot />
  </div>
</Center>