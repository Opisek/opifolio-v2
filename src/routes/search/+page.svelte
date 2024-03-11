<script lang="ts">
  import Filters from "../../components/interactive/Filters.svelte";
  import Floater from "../../components/interactive/Floater.svelte";
  import PostColumn from "../../components/layout/PostColumn.svelte";
  import Title from "../../components/common/Title.svelte";

  import { page } from "$app/stores";

  let innerWidth: number;

  export let data: {
    posts: PostData[],
    tags: string[]
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
      grid-template-areas: "posts outline";
      gap: $gap;
      align-items: start;
    }
  }

  div.posts {
    grid-area: posts;
  }

  aside {
    grid-area: outline;
    position: sticky;
    margin-top: -$navbarHeight - $paddingSmall;
    padding-top: $navbarHeight + $paddingSmall;
    top: 0;
    max-width: 20vw;

    display: flex;
    flex-direction: column;
    gap: $gapSmaller;

    background-color: $primaryBackground;

    @media screen and (max-width: $screenNormal) {
      display: none;
    }
  }
</style>

<Title>Search Posts</Title>
<section>
  <div class="posts" on:touchend={close}>
    <PostColumn posts={data.posts} />
  </div>
  <aside>
    <b>Filters</b>
    <Filters currentTag={tag} tags={data.tags}/>
  </aside>
</section>

<Floater alt="Filter" bind:visible>
  <Filters currentTag={tag} tags={data.tags}/>
</Floater>

<svelte:window bind:innerWidth/>