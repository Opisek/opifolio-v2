<script lang="ts">
  import Header from "../common/Header.svelte";

  export let text: string;
  export let depth: number;
</script>

<Header level={depth + 1} id={text.toLowerCase().replace(" ", "-")}>
  {@html text}
</Header>