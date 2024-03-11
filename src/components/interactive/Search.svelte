<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import SearchIcon from "lucide-svelte/icons/search";

  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/stores";

  let inputElement: HTMLInputElement;

  function sumbit() {
    const query = (inputElement.value || "").trim();
    if (query == "") requestAnimationFrame(() => inputElement.focus());
    else {
      const tag = $page.url.searchParams.get('tag');
      requestAnimationFrame(() => goto(`/search?query=${encodeURIComponent(query)}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`));
    }
  }

  afterNavigate(() => {
    const query = $page.url.searchParams.get('query');
    if (query != null) inputElement.value = query;
  })
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  input {
    border: 0;
    outline: 0;
    color: $secondaryForeground;
    background-color: $secondaryBackground;
    border-radius: $borderRadius;
    min-width: 4em;
    font-size: $fontSizeSmall;
    height: auto;
    padding: $paddingSmaller;
    font-family: inherit;
  }

  form {
    width: max-content;
    gap: $gapSmaller;
    display: flex;
    flex-direction: row;
  }
</style>

<form on:submit={sumbit}>
  <input type="text" placeholder="Search" bind:this={inputElement}/>
  <InlineButton on:click={sumbit} spin={360} alt="Search">
    <SearchIcon/>
  </InlineButton>
</form>