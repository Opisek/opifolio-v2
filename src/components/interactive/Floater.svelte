<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import OutlineIcon from "lucide-svelte/icons/list";
  
  export let alt: string;
  export let visible: boolean = false;

  function toggle() {
    visible = !visible;
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    display: flex;
    flex-direction: column;
    gap: $gapSmaller;
    justify-content: center;
    width: 100%;
  
    transform: translate(calc(100% - 2.1em), calc(100% - 2em));

    position: fixed;

    padding: $paddingSmaller calc(#{$paddingSmaller} + 100vw - 100%) $paddingSmaller $paddingSmaller;

    color: $evenDarkerForeground;
    background-color: $evenDarkerBackground;

    bottom: 0;
    right: 0; 

    border-radius: $borderRadius 0 0 0;

    z-index: 30;

    width: max-content;

    text-align: center;

    @media screen and (min-width: $screenNormal) {
      display: none;  
    }
  }

  div.active {
    transform: translate(0);
  }
</style>

<div class:active={visible}>
  <InlineButton on:click={toggle} spin={360} alt={alt}>
    <slot name="icon">
      <OutlineIcon/>
    </slot>
  </InlineButton>
  <slot/>
</div>