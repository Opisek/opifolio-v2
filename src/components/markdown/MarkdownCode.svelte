<script lang="ts">
  // TODO: check if we can dynamically determine which languages we need to import
  import hljs from "highlight.js";

  import copyIcon from "$lib/assets/icons/copy.png";
  import InlineIconButton from "../interactive/InlineIconButton.svelte";

  export let text: string;
  export let lang: string;

  const highlighted = hljs.highlight(text, { language: lang }).value;

  function copy() {
    navigator.clipboard.writeText(text);
  }

  // TODO: maybe add line numbers
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/codeHighlight.css";


  div.codeBlock {
    color: $codeForeground;
    background-color: $codeBackground;
    font-family: "DM Mono", monospace;
    margin: 0 $paddingSmall;
    padding: $paddingSmall;
    border-radius: $borderRadiusSmall;
    position: relative;
  }
  
  span.code {
    white-space: pre-wrap;
  }

  span.lang {
    color: $fadedForeground;
  }

  div.iconWrapper {
    position: absolute;
    right: $paddingSmall;
    display: flex;
    gap: $gapSmaller
  }
</style>

<div class="codeBlock">
  <div class="iconWrapper">
    <span class="lang">
      {lang}
    </span>
    <InlineIconButton src={copyIcon} alt="Copy" on:click={copy}/>
  </div>
  <span class="code">
    {@html highlighted}
  </span>
</div>