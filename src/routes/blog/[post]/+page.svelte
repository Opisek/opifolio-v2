<script lang="ts">
  import Divider from "../../../components/common/Divider.svelte";
  import DotRow from "../../../components/layout/DotRow.svelte";
  import Floater from "../../../components/interactive/Floater.svelte";
  import Markdown from "../../../components/markdown/Markdown.svelte";
  import Outline from "../../../components/interactive/Outline.svelte";
  import Sidebar from "../../../components/page/Sidebar.svelte";
  import Tag from "../../../components/interactive/Tag.svelte";
  import Title from "../../../components/common/Title.svelte";

  import { page } from "$app/stores";
  
  let innerWidth: number;

  export let data: { post: PostData };
  const post = data.post;

  let headings: HeadingData[] = [];
  function parsed(markdown: any) {
    headings = markdown.detail.tokens
      .filter((x: any) => x.type === "heading")
      .map((x: any) => {return {
        title: x.text,
        tag: x.text.toLowerCase().replace(" ", "-"),
        depth: x.depth
      }});
  }

  export let visible: boolean = false;
  function close() {
    visible = false;
  }
</script>

<style lang="scss">
  @import "../../../styles/colors.scss";
  @import "../../../styles/dimensions.scss";
  @import "../../../styles/media.scss";
  
  div.titlebar {
    display: grid;

    grid-template-columns: auto 1fr $thumbnailWidth;
    grid-template-rows: auto auto;
    grid-template-areas: "title title thumbnail" "info tags thumbnail";
    
    gap: $gapSmall;
    align-items: center;

    @media screen and (max-width: $screenNarrow) {
      grid-template-columns: 1fr $thumbnailWidthSmall;
      grid-template-rows: auto auto auto;
      grid-template-areas: "title thumbnail" "info info" "tags tags";
    }
  }

  div.title {
    grid-area: title;
  }

  div.info {
    grid-area: info;
    color: $fadedForeground;
  }

  div.tags {
    grid-area: tags;
    display: flex;
    gap: $gapSmaller;
    justify-content: start;
    flex-wrap: wrap;
    background-color: $primaryBackground;
  }

  div.thumbnail {
    grid-area: thumbnail;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: $thumbnailWidth;
    height: $thumbnailWidth;
    border-radius: 50%;
    object-fit: cover;

    @media screen and (max-width: $screenNarrow) {
      width: $thumbnailWidthSmall;
      height: $thumbnailWidthSmall;
    }
  }

  section {
    display: grid;
    grid-template-rows: auto;
    gap: $gap;
    align-items: start;

    @media screen and (max-width: $screenNormal) {
      grid-template-columns: 100%; 
      grid-template-areas: "article";
    }
    @media screen and (min-width: $screenNormal) {
      grid-template-columns: 100% auto; 
      grid-template-areas: "article sidebar";
      width: calc(100% - $paddingLarger);
    }
  }

  article {
    grid-area: article;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: $gapSmall;
    align-items: left;
    justify-content: start;

    overflow: hidden;

    margin-bottom: $borderWidth;
  }
</style>

<!-- Title, Author, Date -->
<div class="titlebar">
  <div class="title">
    <Title>
      {post.title}
    </Title>
  </div>
  <div class="info">
    <DotRow>
      <span>{post.author}</span>
      <span>{post.timestamp.toLocaleDateString()}</span>
    </DotRow>
  </div>
  <div class="tags">
    {#each post.tags as tag}
      <Tag tag={tag} />
    {/each}
  </div>
  <div class="thumbnail">
    <img src={post.thumbnail} alt="Thumbnail"/>
  </div>
</div>

<Divider/>

<section>
  <!-- Outline -->
  <Sidebar>
    <b>Contents</b>
    <Outline headings={headings}/>
  </Sidebar>

  <!-- Rendered Markdown -->
  <article on:touchend={close}>
    <Markdown markdown={post.markdown} parsed={parsed}/>
  </article>
</section>

<Floater alt="Table of Contents" bind:visible>
  <Outline headings={headings} clickCallback={close}/>
</Floater>

<svelte:window bind:innerWidth/>

<svelte:head>
  <meta property="og:title" content={post.title}/>
  <meta property="og:description" content={post.summary}/>
  <meta property="og:image" content={$page.url.protocol + "//" + $page.url.host + post.thumbnail}/>
</svelte:head>