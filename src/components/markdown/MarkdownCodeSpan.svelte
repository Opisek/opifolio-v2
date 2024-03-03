<script lang="ts">
  export let text: string;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  
  span {
    color: $codeForeground;
    background-color: $codeBackground;
    padding: $paddingSmaller;
    width: fit-content;
    border-radius: $borderRadius;
    white-space: pre-wrap;
    font-family: "DM Mono", monospace;
    font-size: $fontSizeCode;
  }
</style>

<span>
  {@html text.replaceAll("&amp;", "&")}
</span>