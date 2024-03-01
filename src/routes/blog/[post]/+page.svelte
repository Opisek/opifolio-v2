<script lang="ts">
  import Divider from "../../../components/common/Divider.svelte";
  import MarkdownCode from "../../../components/markdown/MarkdownCode.svelte";
  import MarkdownHeading from "../../../components/markdown/MarkdownHeading.svelte";
  import MarkdownParagraph from "../../../components/markdown/MarkdownParagraph.svelte";
  import Paragraph from "../../../components/common/Paragraph.svelte";
  import Row from "../../../components/layout/Row.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Title from "../../../components/common/Title.svelte";
  
  // TODO: create a type out of this
  export let data: { post: { markdown: string, title: string, author: string, timestamp: Date } };
  const post = data.post;
</script>

<style lang="scss">
  @import "../../../styles/colors.scss";
  @import "../../../styles/dimensions.scss";
  
  div.titlebar {
    display: flex;
    flex-direction: column;
    gap: $gapSmall;
  }

  div.info {
    color: $fadedForeground;
  }

  span {
    width: 100%;
    text-align: right;
  }
</style>

<div class="titlebar">
  <Title>
    {post.title}
  </Title>
  <div class="info">
    <span>
      {post.author}
    </span>
    •
    <span>
      {post.timestamp.toLocaleDateString()}
    </span>
  </div>
</div>

<Divider/>

<SvelteMarkdown source={data.post.markdown} 
  renderers={{
    heading: MarkdownHeading,
    paragraph: MarkdownParagraph,
    code: MarkdownCode,
  }}
/>