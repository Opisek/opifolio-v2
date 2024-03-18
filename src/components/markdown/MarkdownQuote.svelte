<script lang="ts">
  import Admonition from "../common/Admonition.svelte";
  import MarkdownText from "./MarkdownText.svelte";
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

{#if isAdmonition}
  <Admonition type={admonitionType} title={admonitionTitle}>
    <MarkdownText text={lines.join("\n")}/>
  </Admonition>
{:else}
  <Quote>
    <MarkdownText text={text}/>
  </Quote>
{/if}