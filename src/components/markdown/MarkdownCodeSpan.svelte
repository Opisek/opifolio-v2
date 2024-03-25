<script lang="ts">
  export let text: string;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";
  
  code {
    color: $codeForeground;
    background-color: $codeBackground;
    padding: $paddingTiny;
    width: fit-content;
    border-radius: $borderRadiusSmall;
    white-space: pre;
    font-family: "DM Mono", monospace;
    font-size: $fontSizeCode;

    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeCodeMobile;
    }
  }
</style>

<code>
  {@html text.replaceAll("&amp;", "&")}
</code>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet">
</svelte:head>