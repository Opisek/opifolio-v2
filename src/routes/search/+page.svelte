<script lang="ts">
  import Filters from "../../components/interactive/Filters.svelte";
  import PostColumn from "../../components/layout/PostColumn.svelte";
  import Sidebar from "../../components/page/Sidebar.svelte";
  import Title from "../../components/common/Title.svelte";

  import { page } from "$app/stores";

  let innerWidth: number;

  export let data: {
    posts: PostData[],
    tags: string[],
    count: number
  };

  export let visible: boolean = false;
  function close() {
    visible = false;
  }

  $: tag = $page.url.searchParams.get('tag');
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  section {
    @media screen and (min-width: $screenNormal) {
      display: grid;
      grid-template-columns: 1fr auto; 
      grid-template-areas: "posts sidebar";
      gap: $gap;
      align-items: start;
    }
  }

  div.posts {
    grid-area: posts;

    // min height so floater doesn't go to the middle of the page
    // TODO: figure out proper heights
    @media screen and (min-width: $screenNarrow) and (max-width: $screenNormal) {
      min-height: calc(100vh - $navbarHeight - 2 * $paddingLarge - $padding);
    }
    @media screen and (max-width: $screenNarrow) {
      min-height: calc(100vh - $navbarHeightSmall - 5 * $padding - $paddingSmaller);
    }

    display: flex;
    flex-direction: column;
    gap: $gapSmall;
  }
</style>

<Title>Search Posts</Title>
<section>
  <div class="posts" on:touchend={close}>
    <PostColumn posts={data.posts} pageCount={data.count} />
  </div>

  <Sidebar title="Filters" bind:visible>
    <Filters currentTag={tag} tags={data.tags}/>
  </Sidebar>
</section>


<svelte:window bind:innerWidth/>

<svelte:head>
  <title>Search</title>
  <meta name="author" content="Kacper Darowski" />
  <meta name="description" content="Kacper Darowski's Tech Blog and Portfolio" />
  <meta name="keywords" content="Tech, Programming, Open Source, Smarthome, IoT, DIY, Self-Hosted" />
</svelte:head>