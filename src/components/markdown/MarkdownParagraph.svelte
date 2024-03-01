<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import Paragraph from "../common/Paragraph.svelte";
  import Link from "../interactive/Link.svelte";

  export let text: string;
</script>

<style>
  span {
    white-space: pre-wrap;
  }
</style>

<Paragraph>
  <SvelteMarkdown isInline source={text} 
    renderers={{
      link: Link
    }}
  />
</Paragraph>