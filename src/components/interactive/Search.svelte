<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import SearchIcon from "lucide-svelte/icons/search";

  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/stores";

  let inputElement: HTMLInputElement;

  function submit() {
    const query = (inputElement.value || "").trim();
    if (query == "") requestAnimationFrame(() => inputElement.focus());
    else {
      const searchParams = new URLSearchParams($page.url.searchParams);
      searchParams.set("query", query);
      searchParams.delete("page");
      const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

      requestAnimationFrame(() => goto(`/search${search}`));
    }
  }

  afterNavigate(() => {
    const query = $page.url.searchParams.get('query');
    if (query) inputElement.value = query;
    else inputElement.value = "";
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

<form on:submit={submit}>
  <input type="text" placeholder="Search" bind:this={inputElement}/>
  <InlineButton on:click={submit} spin={360} alt="Search">
    <SearchIcon/>
  </InlineButton>
</form>