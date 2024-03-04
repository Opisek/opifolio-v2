<script lang="ts">
  import Divider from "../../../components/common/Divider.svelte";
  import DotRow from "../../../components/layout/DotRow.svelte";
  import OutlineIcon from "lucide-svelte/icons/list";
  import InlineButton from "../../../components/interactive/InlineButton.svelte";
  import Markdown from "../../../components/markdown/Markdown.svelte";
  import Outline from "../../../components/interactive/Outline.svelte";
  import Title from "../../../components/common/Title.svelte";
  
  let innerWidth: number;

  export let data: PostData;
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
    display: flex;
    flex-direction: column;
    gap: $gapSmall;
  }

  div.info {
    color: $fadedForeground;
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
  <Title>
    {post.title}
  </Title>
  <div class="info">
    <DotRow>
      <span>{post.author}</span>
      <span>{post.timestamp.toLocaleDateString()}</span>
    </DotRow>
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