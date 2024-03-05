<script lang="ts">
  import Card from "../../components/common/Card.svelte";
  import Column from "../../components/layout/Column.svelte";
  import Title from "../../components/common/Title.svelte";

  export let data: { posts: PostData[] };
  const posts = data.posts;
</script>

<Title>Blog Posts</Title>
{#if posts.length == 0}
  No posts yet
{:else}
  <Column>
    {#each posts as post}
      <Card post={post}/>
    {/each}
  </Column>
{/if}