<script lang="ts">
  import Header from "../common/Header.svelte";

  export let text: string;
  export let depth: number;
</script>

<Header level={depth}>
  {text}
</Header>