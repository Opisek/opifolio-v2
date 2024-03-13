
<script lang="ts">
  import Divider from "../common/Divider.svelte";
  import MarkdownCode from "./MarkdownCode.svelte";
  import MarkdownHeading from "./MarkdownHeading.svelte";
  import MarkdownList from "./MarkdownList.svelte";
  import MarkdownListItem from "./MarkdownListItem.svelte";
  import MarkdownParagraph from "./MarkdownParagraph.svelte";
  import MarkdownQuote from "./MarkdownQuote.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import sanitizeHtml from "sanitize-html";
  
  export let markdown: string;
  const escaped = markdown.replaceAll("\\$", "&#92;&#36;") // to enable TeX escaping
  const sanitized = sanitizeHtml(escaped, {
    disallowedTagsMode: "recursiveEscape",
    parser: {
      lowerCaseTags: false,
      lowerCaseAttributeNames: false
    }
  });
  const parseable = sanitized
    .replaceAll(/^&gt;/gm, ">") // sanitization breaks markdown quotes
    .replaceAll("\\$", "&#92;&#36;") // to enable TeX escaping

  export let parsed: ((result: any) => void) = (() => {});
</script>

<SvelteMarkdown
  source={parseable} 
  renderers={{
    heading: MarkdownHeading,
    paragraph: MarkdownParagraph,
    code: MarkdownCode,
    blockquote: MarkdownQuote,
    hr: Divider,
    list: MarkdownList,
    listitem: MarkdownListItem
  }}
  on:parsed={parsed}
/>