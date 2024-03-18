<script lang="ts">
  import Link from "../interactive/Link.svelte";

  export let href: string;
</script>

<Link href={href}>
  <slot/>
</Link>