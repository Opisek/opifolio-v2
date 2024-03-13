<script lang="ts">
  import MarkdownInline from "./MarkdownInline.svelte";

  export let text: string;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  li {
    line-height: $lineHeightParagraph;
  }
</style>

<li>
  <MarkdownInline text={text}/>
</li>