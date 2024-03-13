<script lang="ts">
  import Link from "../interactive/Link.svelte";
  import MarkdownInline from "./MarkdownInline.svelte";

  export let href: string;
  export let text: string;
</script>

<Link href={href}>
  <MarkdownInline text={text}/>
</Link>