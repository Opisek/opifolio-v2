<script lang="ts">
  import Header from "../common/Header.svelte";
  import MarkdownInline from "./MarkdownInline.svelte";

  import { formatHeadingId } from "../../lib/common/format";

  export let text: string;
  export let depth: number;
</script>

<Header level={depth + 1} id={formatHeadingId(text)}>
  <MarkdownInline text={text} />
</Header>