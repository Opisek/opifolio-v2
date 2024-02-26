<script>
  import Link from "../components/interactive/Link.svelte";
  import Navbar from "../components/page/Navbar.svelte";
  import Search from "../components/interactive/Search.svelte";
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
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background-color: $primaryBackground;
    margin: 0;
    padding: 0;
    //font-family: 'Public Sans', serif;
    font-family: 'Karla', serif;
    font-size: $fontSize;
    color: $primaryForeground;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  main {
    margin-top: $navbarHeight;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: $paddingSmall $paddingLarger;
    gap: $gapSmall;
    align-items: left;
    justify-content: center;

    @media screen and (max-width: $screenNormal) and (min-width: $screenNarrow) {
      padding: $paddingSmall;
    }
    @media screen and (max-width: $screenNarrow) {
      padding: 0 $paddingSmall $paddingSmall $paddingSmall;
    }
  }
</style>

<Navbar>
  <svelte:fragment slot="primary">
    <Link href="/">Home</Link>
    <Link href="blog">Tech Blog</Link>
    <Link href="projects">Projects</Link>
  </svelte:fragment>
  <svelte:fragment slot="secondary">
    <Search/>
  </svelte:fragment>
</Navbar>
<main>
  <slot></slot>
</main>