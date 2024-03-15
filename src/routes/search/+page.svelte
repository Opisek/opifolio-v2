<script lang="ts">
  import Filters from "../../components/interactive/Filters.svelte";
  import Floater from "../../components/interactive/Floater.svelte";
  import PostColumn from "../../components/layout/PostColumn.svelte";
  import Title from "../../components/common/Title.svelte";

  import { page } from "$app/stores";
    import Sidebar from "../../components/page/Sidebar.svelte";

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
      grid-template-areas: "posts sidebar";
      gap: $gap;
      align-items: start;
    }
  }

  div.posts {
    grid-area: posts;
  }
</style>

<Title>Search Posts</Title>
<section>
  <div class="posts" on:touchend={close}>
    <PostColumn posts={data.posts} />
  </div>
  <Sidebar>
    <b>Filters</b>
    <Filters currentTag={tag} tags={data.tags}/>
  </Sidebar>
</section>

<Floater alt="Filter" bind:visible>
  <Filters currentTag={tag} tags={data.tags}/>
</Floater>

<svelte:window bind:innerWidth/>