<script lang="ts">
  import Column from "../layout/Column.svelte";
  import InlineIconButton from "../interactive/InlineIconButton.svelte";

  import iconClose from "$lib/assets/icons/close.png";
  import iconOpen from "$lib/assets/icons/menu.png";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { browser } from "$app/environment";

  export let visible = false;

  let scrollY: number;
  let width: number;

  function show() {
    visible = true;
    if (browser) document.body.classList.add("noScroll");
  }

  function hide() {
    visible = false;
    if (browser) document.body.classList.remove("noScroll");
  }

  afterNavigate(hide);

  beforeNavigate(event => {
    if (!visible || ![ "popstate", "leave" ].includes(event.type)) return;
    hide();
    event.cancel();
  });
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

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

    @media screen and (max-width: $screenNarrow) {
      height: $navbarHeightSmall;
    }
  }

  div.overlay {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: $primaryBackground;
    pointer-events: none;
  }

  nav.top:not(:hover) > div.overlay {
    opacity: 0.3;
  }
  
  div.left {
    display: flex;
    flex-direction: row;
    gap: $gap;
    justify-items: left;
  }

  div.right {
    display: flex;
    flex-direction: row;
    gap: $gap;
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
    overflow-y: auto;
  }

  div.mobile.active {
    transform: translateX(0);
  }
</style>

<nav class:top={scrollY == 0} class:mobile={width < 1000}>
  {#if width < 1000}
    <InlineIconButton on:click={show} src={iconOpen} spin={180} alt="Show Navigation"/>
    <div class="mobile" class:active={visible}>
      <Column>
        <InlineIconButton on:click={hide} src={iconClose} spin={180} alt="Close"/>
        <slot name="secondary"></slot>
        <slot name="primary"></slot>
      </Column>
    </div>
  {:else}
    <div class="overlay"></div>
    <div class="left">
      <slot name="primary"></slot>
    </div>
    <div class="right">
      <slot name="secondary"></slot>
    </div>
  {/if}
</nav>

<svelte:window bind:scrollY={scrollY} bind:innerWidth={width} on:wheel|nonpassive={e => {
  // TODO: disable background scrolling, but not navbar scrolling
  //if (visible) e.preventDefault();
}}/>