<script lang="ts">
  import Column from "../layout/Column.svelte";
  import InlineButton from "../interactive/InlineButton.svelte";

  import OpenIcon from "lucide-svelte/icons/menu";
  import CloseIcon from "lucide-svelte/icons/x";

  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { browser } from "$app/environment";

  export let visible = false;

  let scrollY: number;
  let width: number;

  function show() {
    visible = true;
    if (browser) {
      const scrollbar = window.innerWidth - document.body.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollbar}px`;
    }
  }

  function hide() {
    visible = false;
    if (browser) {
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    }
  }

  afterNavigate(hide);

  beforeNavigate(event => {
    if (!visible || event.type == "link") return;
    hide();
    event.cancel();
  });

  let touchStartX: number;
  let touchStartY: number;
  let touchStartTimestamp: number;
  let touchStartValid: boolean;

  function touchStart(event: TouchEvent) {
    touchStartValid = event.touches.length == 1;
    if (!touchStartValid) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchStartTimestamp = event.timeStamp;
  }

  function touchEnd(event: TouchEvent) {
    if (!touchStartValid) return;
    const touchDeltaX = event.changedTouches[0].clientX - touchStartX;
    const touchDeltaY = event.changedTouches[0].clientY - touchStartY;
    const touchDeltaT = event.timeStamp - touchStartTimestamp;

    if (
      touchDeltaT > 300
      || Math.abs(touchDeltaY) > Math.abs(touchDeltaX) * 0.5
      || Math.abs(touchDeltaX) < 100
    ) return;

    if (touchDeltaX > 0) show();
    else hide();
  }
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
    <InlineButton on:click={show} spin={180} alt="Navigation Menu">
      <OpenIcon/>
    </InlineButton>
    <div class="mobile" class:active={visible}>
      <Column>
        <InlineButton on:click={hide} spin={180} alt="Close Menu">
          <CloseIcon/>
        </InlineButton>
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

<svelte:window
  bind:scrollY={scrollY}
  bind:innerWidth={width}
  on:touchstart={touchStart}
  on:touchend={touchEnd}
/>