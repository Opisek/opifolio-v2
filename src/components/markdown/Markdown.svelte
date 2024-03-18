
<script lang="ts">
  import Divider from "../common/Divider.svelte";
  import MarkdownCode from "./MarkdownCode.svelte";
  import MarkdownHeading from "./MarkdownHeading.svelte";
  import MarkdownList from "./MarkdownList.svelte";
  import MarkdownListItem from "./MarkdownListItem.svelte";
  import MarkdownParagraph from "./MarkdownParagraph.svelte";
  import MarkdownQuote from "./MarkdownQuote.svelte";
  import MarkdownTable from "./MarkdownTable.svelte";
  import MarkdownTableBody from "./MarkdownTableBody.svelte";
  import MarkdownTableCell from "./MarkdownTableCell.svelte";
  import MarkdownTableHead from "./MarkdownTableHead.svelte";
  import MarkdownTableRow from "./MarkdownTableRow.svelte";
  import MarkdownText from "./MarkdownText.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import sanitizeHtml from "sanitize-html";
    import MarkdownBold from "./MarkdownBold.svelte";
    import MarkdownEmphasis from "./MarkdownEmphasis.svelte";
    import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";
  
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
    blockquote: MarkdownQuote,
    code: MarkdownCode,
    codespan: MarkdownCodeSpan,
    em: MarkdownEmphasis,
    heading: MarkdownHeading,
    hr: Divider,
    list: MarkdownList,
    listitem: MarkdownListItem,
    paragraph: MarkdownParagraph,
    strong: MarkdownBold,
    table: MarkdownTable,
    tablebody: MarkdownTableBody,
    tablecell: MarkdownTableCell,
    tablehead: MarkdownTableHead,
    tablerow: MarkdownTableRow,
    text: MarkdownText,
  }}
  on:parsed={parsed}
/>