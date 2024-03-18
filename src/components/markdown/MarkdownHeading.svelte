<script lang="ts">
  import Header from "../common/Header.svelte";
  import MarkdownInline from "./MarkdownInline.svelte";

  export let text: string;
  export let depth: number;
</script>

<Header level={depth + 1} id={encodeURIComponent(text.toLowerCase().replaceAll(" ", "-"))}>
  <MarkdownInline text={text} />
</Header>