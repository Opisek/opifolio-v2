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

<svelte:head>
  <title>Blog</title>
  <meta name="author" content="Kacper Darowski" />
  <meta name="description" content="Kacper Darowski's Tech Blog and Portfolio" />
  <meta name="keywords" content="Tech, Programming, Open Source, Smarthome, IoT, DIY, Self-Hosted" />
</svelte:head>