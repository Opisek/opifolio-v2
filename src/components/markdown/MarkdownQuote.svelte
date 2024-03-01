<script lang="ts">
  import sanitizeHtml from "sanitize-html";

  export let text: string;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/codeHighlight.css";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    color: $secondaryForeground;
    background-color: $secondaryBackground;
    margin: 0 $paddingSmall;
    padding: $paddingSmall;
    border-radius: $borderRadius;
  }
</style>

<div>
  {@html sanitizeHtml(text, { disallowedTagsMode: "recursiveEscape" })}
</div>