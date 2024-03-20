<script lang="ts">
  import Card from "../common/Card.svelte";
  import Column from "./Column.svelte";
  import Pagination from "../interactive/Pagination.svelte";

  export let posts: PostData[];
  export let pageCount: number;
</script>

{#if posts.length == 0}
  No posts yet
{:else}
  <Pagination pageCount={pageCount}/>
  <Column>
    {#each posts as post}
      <Card post={post}/>
    {/each}
  </Column>
  <Pagination pageCount={pageCount}/>
{/if}