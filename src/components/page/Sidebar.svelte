<script lang="ts">
  import Bold from "../common/Bold.svelte";
import Floater from "../interactive/Floater.svelte";

  export let title: string;
  export let visible: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";
  
  aside {
    grid-area: sidebar;
    position: sticky;
    top: $navbarHeight + $paddingSmall;
    max-width: 20vw;
    //min-width: fit-content;

    //max-height: calc(100vh - $navbarHeight - $paddingSmall);
    //overflow-y: auto;
    //overflow-x: visible !important;

    display: flex;
    flex-direction: column;
    gap: $gapSmaller;

    background-color: $primaryBackground;

    @media screen and (max-width: $screenNormal) {
      display: none;
    }
  }
</style>

<aside>
  <Bold>
    {title}
  </Bold>
  <slot/>
</aside>
<Floater alt={title} bind:visible>
  <slot/>
</Floater>