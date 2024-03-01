<script lang="ts">
  // TODO: check if we can dynamically determine which languages we need to import
  import hljs from "highlight.js";

  import copyIcon from "$lib/assets/icons/copy.png";
  import InlineIconButton from "../interactive/InlineIconButton.svelte";

  export let text: string;
  export let lang: string;

  const highlighted = hljs.highlight(text, { language: lang }).value;

  let toastVisible: boolean = false;
  let toastTimeout: ReturnType<typeof setTimeout> | null = null;

  function copy() {
    navigator.clipboard.writeText(text);

    toastVisible = true;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastVisible = false;
    }, 1000);
  }

  // TODO: maybe add line numbers
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/codeHighlight.css";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";


  div.codeBlock {
    color: $codeForeground;
    background-color: $codeBackground;
    margin: 0 $paddingSmall;
    padding: $paddingSmall;
    border-radius: $borderRadius;
    position: relative;
  }
  
  span.code {
    white-space: pre-wrap;
    font-family: "DM Mono", monospace;
    font-size: $fontSizeCode;

    @media screen and (min-width: $screenNarrow) {
      padding-right: 10%;
    }
  }

  span.lang {
    color: $fadedForeground;
  }

  span.toast {
    border-radius: $borderRadius;
    position: relative;
    left: calc(100% + #{$paddingSmaller});

    @media screen and (min-width: $screenNarrow) {
      background-color: $darkerBackground;
    }
  }

  span.toast.active {
    left: 0;
  }

  span.toastWrapper {
    overflow: hidden;
  }

  div.iconWrapper {
    position: absolute;
    right: $paddingSmall;
    display: flex;
    flex-direction: row;
    gap: $gapSmall;

    @media screen and (max-width: $screenNarrow) {
      position: relative;
      background-color: $evenDarkerBackground;
      border-radius: $borderRadius;
      top: -$paddingSmall;
      width: calc(100% + #{2 * $paddingSmall});
      margin-bottom: -$paddingSmaller;
      justify-content: right;
      padding: $paddingSmaller;
    }
  }
</style>

<div class="codeBlock">
  <div class="iconWrapper">
    <span class="toastWrapper">
      <span class="toast" class:active={toastVisible}>
        Copied
      </span>
    </span>
    <span class="lang">
      {lang}
    </span>
    <InlineIconButton src={copyIcon} alt="Copy" on:click={copy}/>
  </div>
  <span class="code">
    {@html highlighted}
  </span>
</div>