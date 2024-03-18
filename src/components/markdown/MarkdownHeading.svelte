<script lang="ts">
  import Header from "../common/Header.svelte";

  import { formatHeadingId } from "../../lib/common/format";

  export let text: string;
  export let depth: number;
</script>

<Header level={depth + 1} id={formatHeadingId(text)}>
  <slot/>
</Header>