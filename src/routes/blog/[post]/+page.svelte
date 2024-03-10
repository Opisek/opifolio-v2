<script lang="ts">
  import Divider from "../../../components/common/Divider.svelte";
  import DotRow from "../../../components/layout/DotRow.svelte";
  import InlineButton from "../../../components/interactive/InlineButton.svelte";
  import Markdown from "../../../components/markdown/Markdown.svelte";
  import Outline from "../../../components/interactive/Outline.svelte";
  import OutlineIcon from "lucide-svelte/icons/list";
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
  function toggle() {
    visible = !visible;
  }
  function close() {
    visible = false;
  }

  // TODO: add admonitions
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
    @media screen and (min-width: $screenNormal) {
      display: grid;
      grid-template-columns: 1fr auto; 
      grid-template-areas: "article outline";
      gap: $gap;
      align-items: start;
    }
  }

  aside {
    grid-area: outline;
    position: sticky;
    margin-top: -$navbarHeight - $paddingSmall;
    padding-top: $navbarHeight + $paddingSmall;
    top: 0;

    display: flex;
    flex-direction: column;
    gap: $gapSmaller;

    @media screen and (max-width: $screenNormal) {
      display: none;
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
  }

  div.floater {
    display: flex;
    flex-direction: column;
    gap: $gapSmaller;
    justify-content: center;
    width: 100%;
  
    transform: translate(calc(100% - 2.1em), calc(100% - 2em));

    position: fixed;

    padding: $paddingSmaller calc(#{$paddingSmaller} + 100vw - 100%) $paddingSmaller $paddingSmaller;

    color: $evenDarkerForeground;
    background-color: $evenDarkerBackground;

    bottom: 0;
    right: 0; 

    border-radius: $borderRadius 0 0 0;

    z-index: 30;

    width: max-content;

    text-align: center;

    @media screen and (min-width: $screenNormal) {
      display: none;  
    }
  }

  div.floater.active {
    transform: translate(0);
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
    <img src={post.thumbnail + ".webp"} alt="Thumbnail"/>
  </div>
</div>

<Divider/>

<section>
  <!-- Outline -->
  <aside>
    <b>Contents</b>
    <Outline headings={headings}/>
  </aside>

  <!-- Rendered Markdown -->
  <article on:touchend={close}>
    <Markdown markdown={post.markdown} parsed={parsed}/>
  </article>
</section>

<div class="floater" class:active={visible}>
  <InlineButton on:click={toggle} spin={360} alt="Table of Contests">
    <OutlineIcon/>
  </InlineButton>
  <Outline headings={headings} clickCallback={close}/>
</div>

<svelte:window bind:innerWidth/>

<svelte:head>
  <meta property="og:title" content={post.title}/>
  <meta property="og:description" content={post.summary}/>
  <meta property="og:image" content={$page.url.host + post.thumbnail + ".webp"}/>
</svelte:head>