<script lang="ts">
  import Header from "./Header.svelte";
  export let id: string = "";
</script>

<Header level={1} id={id}>
  <slot>
  </slot>
</Header>