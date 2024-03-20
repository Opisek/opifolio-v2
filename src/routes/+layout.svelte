<script lang="ts">
  import Footer from "../components/page/Footer.svelte";
  import Link from "../components/interactive/Link.svelte";
  import Navbar from "../components/page/Navbar.svelte";
  import Search from "../components/interactive/Search.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { tick } from "svelte";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import { PUBLIC_PLAUSIBLE_DOMAIN } from "$env/static/public";

  // Fix SvelteKit scrolling issue
  beforeNavigate(async () => {
    if (!browser) return;
    document.getElementsByTagName("html")[0].classList.add("pageSwitch");
  })
  afterNavigate(async () => {
    if (!browser) return;
    await tick();
    document.getElementsByTagName("html")[0].classList.remove("pageSwitch");
  });

  function scroll() {
    if (!browser) return;
    if (window.scrollY <= 0) document.body.classList.add("top");
    else document.body.classList.remove("top");
  }
</script>

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  :global(*) { 
    box-sizing: border-box;
    transition: $animationSpeed ease-out;
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
    background-color: $darkerBackground;
    margin: 0;
    padding: 0;
    font-family: 'Karla', serif;
    font-size: $fontSize;
    font-weight: $fontWeight;
    color: $primaryForeground;
    transition: none;

    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeMobile;
    }
  }

  :global(body.top) {
    background-color: $primaryBackground;
  }

  main {
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
    background-color: $primaryBackground;
    padding-top: $navbarHeight;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    overflow-x: clip;

    @media screen and (max-width: $screenNarrow) {
      padding-top: $navbarHeightSmall;
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
    {#if $page.url.pathname != "/search"}
        <Search/>
    {/if}
  </svelte:fragment>
</Navbar>
<div>
  <main>
    <slot></slot>
  </main>
  <Footer>
    <Link href="/git/opifolio-v2">Source Code</Link>
    <Link href="/credits">Credits</Link>
    © Kacper Darowski 2024
  </Footer>
</div>

<svelte:window on:scroll={scroll}/>
<svelte:head>
  <script defer data-domain="{PUBLIC_PLAUSIBLE_DOMAIN}" data-api="/api/event" src="/js/viewcount.js"></script>
  <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
</svelte:head>