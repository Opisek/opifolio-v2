<script lang="ts">
  import Column from "./Column.svelte";
  import InlineIconButton from "./InlineIconButton.svelte";

  import iconClose from "$lib/assets/icons/close.png";
  import iconOpen from "$lib/assets/icons/menu.png";

  let visible = false;

  let scrollY: number;
  let width: number;

  function show() {
    visible = true;
  }

  function hide() {
    visible = false;
  }
</script>

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/dimensions.scss";

  nav {
    height: $navbarHeight;
    width: 100%;
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 $paddingSmall;
    justify-content: space-between;

    background-color: $navbarBackground;
    backdrop-filter: blur(0.5em);
  }

  nav.top:not(.mobile) {
    color: $fadedForeground;
  }
  
  div.left {
    display: flex;
    flex-direction: row;
    gap: $gapSmall;
    justify-items: left;
  }

  div.right {
    display: flex;
    flex-direction: row;
    gap: $gapSmall;
    justify-items: right;
  }

  div.mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: $navbarBackgroundOpaque;
    backdrop-filter: blur(0.5em);
    padding: $padding;
    transform: translateX(-100%);
    transition: transform $animationSpeed ease-out;
  }

  div.mobile.active {
    transform: translateX(0);
  }
</style>

<nav class:top={scrollY == 0} class:mobile={width < 1000}>
  {#if width < 1000}
    <InlineIconButton on:click={show} src={iconOpen} alt="Show Navigation"/>
    <div class="mobile" class:active={visible}>
      <Column>
        <InlineIconButton on:click={hide} src={iconClose} alt="Close"/>
        <slot name="secondary"></slot>
        <slot name="primary"></slot>
      </Column>
    </div>
  {:else}
    <div class="left">
      <slot name="primary"></slot>
    </div>
    <div class="right">
      <slot name="secondary"></slot>
    </div>
  {/if}
</nav>

<svelte:window bind:scrollY={scrollY} bind:innerWidth={width}/>