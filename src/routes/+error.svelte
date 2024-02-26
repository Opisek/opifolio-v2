<script lang="ts">
  import error from "$lib/assets/icons/error.png";
  import { page } from "$app/stores";
  import Splash from "../components/Splash.svelte";
  import Title from "../components/Title.svelte";
  import Paragraph from "../components/Paragraph.svelte";
  import Row from "../components/Row.svelte";
  import Button from "../components/Button.svelte";

  import { browser } from "$app/environment";

  function goBack() {
    history.back();
  }
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