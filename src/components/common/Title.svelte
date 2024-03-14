<script lang="ts">
  import Header from "./Header.svelte";
  export let id: string = "";
  export let nomargin: boolean = false;
</script>

<Header level={1} id={id} nomargin={nomargin}>
  <slot>
  </slot>
</Header>