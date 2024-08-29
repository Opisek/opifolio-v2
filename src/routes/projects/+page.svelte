<script lang="ts">
  import DrillIcon from "lucide-svelte/icons/drill"

  import Button from "../../components/interactive/Button.svelte";
  import Paragraph from "../../components/common/Paragraph.svelte";
  import Row from "../../components/layout/Row.svelte";
  import Splash from "../../components/page/Splash.svelte";
  import Title from "../../components/common/Title.svelte";

  import { browser } from "$app/environment";

  function goBack() {
    history.back();
  }
</script>

<Splash style="square">
  <svelte:fragment slot="image">
    <DrillIcon size="10em" />
  </svelte:fragment>

  <Title>Under Construction</Title>
    <Paragraph>
      This page is still under construction.
    </Paragraph>
  <Row>
    <Button href="/">Home</Button>
    {#if browser && window.history.length > 1}
      <Button on:click={goBack}>Go Back</Button>
    {/if}
  </Row>
</Splash>