<script lang="ts">
  import Emphasis from "../common/Emphasis.svelte";

  export let text: string;
</script>

<Emphasis>
  {@html text}
</Emphasis>