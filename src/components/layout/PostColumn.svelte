<script lang="ts">
  import Card from "../common/Card.svelte";
  import Column from "./Column.svelte";
  import Pagination from "../interactive/Pagination.svelte";

  export let posts: PostData[];
</script>

{#if posts.length == 0}
  No posts yet
{:else}
  <Pagination/>
  <Column>
    {#each posts as post}
      <Card post={post}/>
    {/each}
  </Column>
  <Pagination/>
{/if}