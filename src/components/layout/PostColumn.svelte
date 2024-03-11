<script lang="ts">
  import Card from "../common/Card.svelte";
  import Column from "./Column.svelte";

  export let posts: PostData[];
</script>

{#if posts.length == 0}
  No posts yet
{:else}
  <Column>
    {#each posts as post}
      <Card post={post}/>
    {/each}
  </Column>
{/if}