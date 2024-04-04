<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import MoonIcon from "lucide-svelte/icons/moon";

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

<InlineButton on:click={toggle} spin={360} alt="Theme">
  <MoonIcon/>
</InlineButton>