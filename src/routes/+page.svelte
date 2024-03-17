<script lang="ts">
  import portraitImage from "$lib/assets/portrait.png";
  import githubLogo from "$lib/assets/logos/github.svg";
  import linkedinLogo from "$lib/assets/logos/linkedin.svg";
  import youtubeLogo from "$lib/assets/logos/youtube.svg";

  import Button from "../components/interactive/Button.svelte";
  import Card from "../components/common/Card.svelte";
  import Gallery from "../components/layout/Gallery.svelte";
  import ImageLink from "../components/interactive/ImageLink.svelte";
  import Link from "../components/interactive/Link.svelte";
  import Paragraph from "../components/common/Paragraph.svelte";
  import Row from "../components/layout/Row.svelte";
  import Splash from "../components/page/Splash.svelte";
  import Title from "../components/common/Title.svelte";

  import { browser } from "$app/environment";
    import Center from "../components/layout/Center.svelte";

  let posts: PostData[] = [];
  let postsLoaded: boolean = false;
  let fetchError: boolean = false;
  (async () => {
    if (!browser) return
    const response = await fetch("/api/posts?limit=6");
    postsLoaded = true;
    if (response.ok) posts = await response.json();
    else fetchError = true;
  })();
</script>

<Splash src={portraitImage} alt="Portrait Photo">
  <Title>Hi, welcome to my blog!</Title>
  <Paragraph>
    My name's Kacper Darowski, also known as Opisek.
    I'm a computer science student at the Technical University of Munich, who's been fascinated with programming ever since the age of nine!
    My areas of interest are theoretical computer science, algorithmics as well as low-level and embedded development.
    On top of that, I love writing open-source code, like <Link href="/git/opifolio-v2">this very website</Link>!
  </Paragraph>
  <Row>
    <Button href="#posts">Blog Posts</Button>
    <Button href="#social">Social Media</Button>
  </Row>
</Splash>

<Title id="posts" nomargin={true}>Recent Posts</Title>
{#if !postsLoaded}
  <Center>
    Loading posts...
  </Center>
{:else if fetchError}
  <Center>
    Could not load posts at this moment
  </Center>
{:else if posts.length == 0}
  <Center>
    No posts yet
  </Center>
{:else}
  <Gallery>
    {#each posts as post}
      <Card post={post} compact={true}/>
    {/each}
  </Gallery>
  <Center>
    <Button href="/blog">See all posts</Button>
  </Center>
{/if}

<Title id="social">Social Media</Title>
<Row mobileAlign="left">
  <ImageLink src={githubLogo} site="GitHub" handle="Opisek" href="github"/>
  <ImageLink src={linkedinLogo} site="LinkedIn" handle="Kacper Darowski" href="linkedin"/>
  <ImageLink src={youtubeLogo} site="YouTube" handle="Opisek" href="youtube"/>
</Row>

<svelte:head>
  <meta property="og:title" content="Kacper Darowski's Tech Blog and Portfolio"/>
  <meta property="og:description" content="Tech blog about DIY IoT, self-hosting, open source and more"/>
</svelte:head>