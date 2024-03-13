<script lang="ts">
  import Bold from "../common/Bold.svelte";
  import MarkdownInline from "./MarkdownInline.svelte";

  export let text: string;
</script>

<Bold>
  <MarkdownInline text={text}/>
</Bold>