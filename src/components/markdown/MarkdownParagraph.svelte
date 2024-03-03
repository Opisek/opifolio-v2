<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import Paragraph from "../common/Paragraph.svelte";
  import Link from "../interactive/Link.svelte";
  import MarkdownText from "./MarkdownText.svelte";
  import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";

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
        codespan: MarkdownCodeSpan
      }}
    />
  </span>
</Paragraph>