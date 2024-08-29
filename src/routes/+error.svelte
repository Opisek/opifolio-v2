<script lang="ts">
  import ErrorIcon from "lucide-svelte/icons/bug";

  import Splash from "../components/page/Splash.svelte";
  import Title from "../components/common/Title.svelte";
  import Paragraph from "../components/common/Paragraph.svelte";
  import Row from "../components/layout/Row.svelte";
  import Button from "../components/interactive/Button.svelte";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  function goBack() {
    history.back();
  }

  //@ts-ignore
  if (browser) document.addEventListener('DOMContentLoaded', function () { plausible($page.status, { props: { path: document.location.pathname } }); });
</script>

<Splash style="square">
  <svelte:fragment slot="image">
    <ErrorIcon size="10em" />
  </svelte:fragment>

  <Title>Error {$page.status}</Title>
    <Paragraph>
      {#if $page.error}
        {$page.error.message}
      {:else}
        An error occured requesting the page.
      {/if}
    </Paragraph>
  <Row>
    <Button href="/">Home</Button>
    {#if browser && window.history.length > 1}
      <Button on:click={goBack}>Go Back</Button>
    {/if}
  </Row>
</Splash>

<svelte:head>
  <title>Error {$page.status}</title>
  <meta name="author" content="Kacper Darowski" />
  <meta name="description" content="Kacper Darowski's Tech Blog and Portfolio" />
  <meta name="keywords" content="Tech, Programming, Open Source, Smarthome, IoT, DIY, Self-Hosted" />
  <meta name="robots" content="noindex" />
</svelte:head>