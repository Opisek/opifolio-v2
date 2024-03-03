<script lang="ts">
  import Tex from "../common/Tex.svelte";

  export let text: string;

  const hasMath = text.includes("$");
  let parts: string[] = [];
  let equations: string[][] = [];
  if (hasMath) {
    const equationRegex = /(?:^\$)?\$([^\$]+)\$(?:\$$)?/gm;
    parts = text.split(equationRegex).map(part => part.replaceAll("&#92;&#36;", "$"));
    equations = [...text.matchAll(equationRegex)];
  }
</script>

{#if hasMath}
  {#each parts as part, index}
    {#if index%2 == 0}
      {@html part}
    {:else}
      <Tex math={part} displayMode={
        equations[(index - 1) / 2][0].startsWith("$$")
      }/>
    {/if}
  {/each}
{:else}
  {@html text.replaceAll("&#92;&#36;", "$")}
{/if}