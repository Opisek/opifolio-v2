<script lang="ts">
  import Bold from "../common/Bold.svelte";
  import ArrowIcon from "lucide-svelte/icons/arrow-up";

  export let alt: string;
  export let visible: boolean = false;
  
  let containerHeight: number;
  let buttonHeight: number;
  $: margin = containerHeight - buttonHeight;

  function toggle() {
    visible = !visible;
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div.container {
    display: flex;
    flex-direction: column;
    gap: $gapSmaller;
    justify-content: center;

    margin-left: -$paddingSmall;
    width: calc(100% + 2 * $paddingSmall);

    position: sticky;

    color: $evenDarkerForeground;

    bottom: $padding + $paddingSmall;

    z-index: 9;

    text-align: center;

    transform: translateY($padding + $paddingSmall);

    @media screen and (min-width: $screenNormal) {
      display: none;  
    }
    
    overflow: hidden;
    pointer-events: none;
  }

  div.floater {
    pointer-events: all;
    transform: translateY(100%);
    padding: 0 $paddingSmall $paddingSmall $paddingSmall;
    background-color: $evenDarkerBackground;
  }

  div.active {
    transform: translateY(0);
  }

  button {
    pointer-events: all;
    position: absolute;
    top: 3 * -$paddingSmall;
    width: 100%;
    background-color: $evenDarkerBackground;
    padding: $paddingSmall;
    left: 0;
    border-radius: $borderRadius $borderRadius 0 0;

    text-decoration: inherit;
    color: inherit;
    font-size: inherit;
    font: inherit;
    border: 0;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: $gapTiny;
    align-items: center;
  }

  div.dummy {
    height: 3 * $paddingSmall;
  }
</style>

<div class="container" style="margin-top:-{margin}px" bind:clientHeight={containerHeight}>
  <div class="dummy"/>
  <div class="floater" class:active={visible}>
    <button on:click={toggle} bind:clientHeight={buttonHeight}>
      <Bold>
        {alt}
      </Bold>
      <ArrowIcon style="transform: rotate({visible ? 180 : 0}deg)"/>
    </button>
    <slot/>
  </div>
</div>