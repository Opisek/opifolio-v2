<script lang="ts">
  import sanitizeHtml from "sanitize-html";

  export let text: string;
</script>

{@html sanitizeHtml(text, { disallowedTagsMode: "recursiveEscape" })}