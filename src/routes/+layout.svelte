<script lang="ts">
  import Footer from "../components/page/Footer.svelte";
  import Link from "../components/interactive/Link.svelte";
  import Navbar from "../components/page/Navbar.svelte";
  import Search from "../components/interactive/Search.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { tick } from "svelte";

  // Fix SvelteKit scrolling issue
  import { browser } from "$app/environment";

  beforeNavigate(async (nav) => {
    if (!browser) return;
    document.getElementsByTagName("html")[0].classList.add("pageSwitch");
  })
  afterNavigate(async (nav) => {
    if (!browser) return;
    await tick();
    document.getElementsByTagName("html")[0].classList.remove("pageSwitch");
  });
</script>

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  :global(*) { 
    box-sizing: border-box;
    transition: $animationSpeed ease-out;

    scroll-margin-top: $navbarHeight * 0.5;

    @media screen and (max-width: $screenNarrow) {
      scroll-margin-top: $navbarHeightSmall * 0.5;
    }
  }

  :global(html) {
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  :global(html.pageSwitch) {
    scroll-behavior: auto;
  }

  :global(body) {
    background-color: $primaryBackground;
    margin: 0;
    padding: 0;
    //font-family: 'Public Sans', serif;
    font-family: 'Karla', serif;
    font-size: $fontSize;
    font-weight: $fontWeight;
    color: $primaryForeground;
    display: grid;
    grid-template-rows: auto 1fr;
    transition: none;
  }

  :global(body.noScroll) {
    overflow-y: hidden;
    margin-right: 16px; // TODO: no hard-coded margin
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: $paddingSmall $paddingLarger;
    gap: $gapSmall;
    align-items: left;
    justify-content: start;

    @media screen and (max-width: $screenNormal) and (min-width: $screenNarrow) {
      padding: $paddingSmall;
    }
    @media screen and (max-width: $screenNarrow) {
      padding: 0 $paddingSmall $paddingSmall $paddingSmall;
    }
  }

  div {
    margin-top: $navbarHeight;
    min-height: calc(100vh - #{$navbarHeight});
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: $screenNarrow) {
      margin-top: $navbarHeightSmall;
      min-height: calc(100vh - #{$navbarHeightSmall});
    }
  }
</style>

<Navbar>
  <svelte:fragment slot="primary">
    <Link href="/">Home</Link>
    <Link href="/blog">Tech Blog</Link>
    <Link href="/projects">Projects</Link>
  </svelte:fragment>
  <svelte:fragment slot="secondary">
    <Search/>
  </svelte:fragment>
</Navbar>
<div>
  <main>
    <slot></slot>
  </main>
  <Footer>
    <Link href="/credits">Credits</Link>
    © Kacper Darowski 2024
  </Footer>
</div>