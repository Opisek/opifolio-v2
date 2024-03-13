<script lang="ts">
  export let text: string;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  
  code {
    color: $codeForeground;
    background-color: $codeBackground;
    padding: $paddingSmaller;
    width: fit-content;
    border-radius: $borderRadius;
    white-space: pre;
    font-family: "DM Mono", monospace;
    font-size: $fontSizeCode;
  }
</style>

<code>
  {@html text.replaceAll("&amp;", "&")}
</code>