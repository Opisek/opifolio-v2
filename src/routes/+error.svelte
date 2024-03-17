<script lang="ts">
  import error from "$lib/assets/icons/error.png";

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

<Splash src={error} style="square">
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
