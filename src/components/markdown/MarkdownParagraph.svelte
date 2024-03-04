<script lang="ts">
  import Link from "../interactive/Link.svelte";
  import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";
  import MarkdownImage from "./MarkdownImage.svelte";
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
        link: Link,
        text: MarkdownText,
        codespan: MarkdownCodeSpan,
        image: MarkdownImage
      }}
    />
  </span>
</Paragraph>