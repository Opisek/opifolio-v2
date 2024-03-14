<script>
    import Center from "./Center.svelte";

</script>
<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  //div {
  //  display: flex;
  //  flex-direction: row;
  //  flex-wrap: wrap;

  //  flex-grow: 1;

  //  justify-content: center;
  //  align-items: stretch;
  //  
  //  height: fit-content;
  //  grid-gap: $gapSmall;

  //  @media screen and (max-width: $screenNarrow) {
  //    flex-direction: column;
  //  }
  //}

  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($cardWidth, 1fr));
    grid-auto-rows: 1fr;

    width: 100%;

    justify-content: center;
    align-items: stretch;
    
    grid-gap: $gapSmall;

    @media screen and (max-width: $screenNarrow) {
      grid-template-columns: 1fr;
    }
  } 
</style>

<Center>
  <div>
    <slot />
  </div>
</Center>