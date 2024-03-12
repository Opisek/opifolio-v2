<script lang="ts">
  export let ordered: boolean;
  export let start: number;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  ol, ul {
    margin: 0;
  }
</style>

{#if ordered}
  <ol {start}><slot></slot></ol>
{:else}
  <ul><slot></slot></ul>
{/if}