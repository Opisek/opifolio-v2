<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import MoonIcon from "lucide-svelte/icons/moon";
  import SunIcon from "lucide-svelte/icons/sun";

  import { theme } from "../../lib/client/theme";
  import { browser } from "$app/environment";

  $: updateTheme($theme);
  function updateTheme(theme: string) {
    if (!browser) return;
    document.documentElement.setAttribute("data-theme", theme);
  }
  function toggle() {
    $theme = $theme == "light" ? "dark" : "light";
  }
</script>

<style>
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span :global(> *:first-child) {
    top: 0;
    left: 0;
    position: absolute;
  }
  span.dark :global(> *:first-child) {
    opacity: 0;
  }
  span.light :global(> *:nth-child(2)) {
    opacity: 0;
  }
</style>

<InlineButton on:click={toggle} spin={$theme == "dark" ? -90 : 360} alt="Theme">
  <span class:dark={$theme == "dark"} class:light={$theme == "light"}>
    <MoonIcon/>
    <SunIcon/>
  </span>
</InlineButton>