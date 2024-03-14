<script lang="ts">
  // TODO: check if we can dynamically determine which languages we need to import
  import hljs from "highlight.js";

  import CopyIcon from "lucide-svelte/icons/copy";
  import InlineButton from "../interactive/InlineButton.svelte";

  export let text: string;
  export let lang: string;

  const unescaped = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">"); 
  const highlighted = hljs.highlight(unescaped, { language: lang }).value;

  let toastVisible: boolean = false;
  let toastTimeout: ReturnType<typeof setTimeout> | null = null;

  function copy() {
    console.log("copy")
    navigator.clipboard.writeText(unescaped);

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
    padding: $paddingSmall;
    border-radius: $borderRadius;
    position: relative;
    width: 100%;

    @media screen and (min-width: $screenNarrow) {
      margin: 0 $paddingSmall;
      width: calc(100% - 2 * #{$paddingSmall});
    }
  }
  
  code {
    white-space: pre;
    font-family: "DM Mono", monospace;
    font-size: $fontSizeCode;
    width: 100%;
    display: block;
    overflow-x: auto;

    padding-bottom: $paddingSmaller;
    margin-bottom: -$paddingSmaller;

    @media screen and (min-width: $screenNarrow) {
      padding-right: 10%;
    }

    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeCodeMobile;
    }
  }

  span.lang {
    color: $fadedForeground;
    user-select: none;
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
    transition: none;

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
    <InlineButton on:click={copy} spin={360} alt="Copy">
      <CopyIcon/>
    </InlineButton>
  </div>
  <code>
    {@html highlighted}
  </code>
</div>