<script lang="ts">
  import MarkdownBold from "./MarkdownBold.svelte";
  import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";
  import MarkdownEmphasis from "./MarkdownEmphasis.svelte";
  import MarkdownLink from "./MarkdownLink.svelte";
  import MarkdownText from "./MarkdownText.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let text: string;
</script>

<SvelteMarkdown isInline source={text}
  renderers={{
    link: MarkdownLink,
    text: MarkdownText,
    codespan: MarkdownCodeSpan,
    em: MarkdownEmphasis,
    strong: MarkdownBold
  }}
/>