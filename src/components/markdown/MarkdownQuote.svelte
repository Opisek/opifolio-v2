<script lang="ts">
  import Admonition from "../common/Admonition.svelte";
  import Quote from "../common/Quote.svelte";

  export let text: string;

  const lines = text.split("\n");
  const firstLine = lines.shift();

  let isAdmonition: boolean;
  let admonitionType: string;
  let admonitionTitle: string | null;
  if (firstLine) {
    const match = firstLine.match(/\[!([^\]]+)\](?:\s(.+))?/);
    if (match == null) {
      isAdmonition = false;
    } else {
      isAdmonition = true;
      admonitionType = match[1];
      admonitionTitle = match[2];
    }
  } else {
    isAdmonition = false;
  }
</script>

<style lang="scss">
  span {
    white-space: pre;
  }
</style>

{#if isAdmonition}
  <Admonition type={admonitionType} title={admonitionTitle}>
      {@html lines.join('\n')}
  </Admonition>
{:else}
  <Quote>
    <span>
      {@html text}
    </span>
  </Quote>
{/if}