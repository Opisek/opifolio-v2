<script lang="ts">
  import MarkdownBold from "./MarkdownBold.svelte";
  import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";
  import MarkdownEmphasis from "./MarkdownEmphasis.svelte";
  import MarkdownImage from "./MarkdownImage.svelte";
  import MarkdownLink from "./MarkdownLink.svelte";
  import MarkdownText from "./MarkdownText.svelte";
  import Paragraph from "../common/Paragraph.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let text: string;
</script>

<style>
  span {
    white-space: pre-wrap;
  }
</style>

<Paragraph>
  <span>
    <SvelteMarkdown isInline source={text} 
      renderers={{
        link: MarkdownLink,
        text: MarkdownText,
        codespan: MarkdownCodeSpan,
        image: MarkdownImage,
        em: MarkdownEmphasis,
        strong: MarkdownBold
      }}
    />
  </span>
</Paragraph>