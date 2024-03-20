<script lang="ts">
  import PostColumn from "../../components/layout/PostColumn.svelte";
  import Title from "../../components/common/Title.svelte";

  export let data: {
    posts: PostData[],
    count: number
  };
</script>

<Title>Blog Posts</Title>
<PostColumn posts={data.posts} pageCount={data.count} />