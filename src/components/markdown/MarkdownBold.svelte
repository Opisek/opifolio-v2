<script lang="ts">
  import Bold from "../common/Bold.svelte";

  export let text: string;
</script>

<Bold>
  {@html text}
</Bold>