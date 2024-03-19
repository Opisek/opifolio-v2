<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let currentPage: number = 1;
  $: url = $page.url;

  afterNavigate(async () => {
    currentPage = Number.parseInt(url.searchParams.get("page") || "1");
    if (currentPage < 1) changePage(1);
  });

  function changePage(page: number): void {
    const searchParams = new URLSearchParams(url.searchParams);
    searchParams.set("page", page.toString());
    const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    
    requestAnimationFrame(() => goto(`${url.pathname}${search}`));
  }

  function goBack(): void {
    if (currentPage <= 1) return;
    changePage(currentPage - 1);
  }

  function goNext(): void {
    changePage(currentPage + 1);
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $gapSmall;
    width: 100%;
  }

  button {
    all: unset;
    cursor: pointer;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.disabled {
    cursor: not-allowed;
    color: $fadedForeground;
  }

  input {
    background-color: transparent;
    font-size: inherit;
    text-decoration: inherit;
    font-weight: inherit;
    color: inherit;
    border: 0;
    outline: 0;
    margin: 0;
    padding: paddingSmall;
    -moz-appearance: textfield;
    text-align: center;
    width: 3em;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<div>
  <button on:click={goBack} aria-label="Previous Page" class:disabled={currentPage <= 1}>
    <ChevronLeft />
  </button>
  <input bind:value={currentPage} type="number" min="1" aria-label="Current Page"/>
  <button on:click={goNext} aria-label="Next Page">
    <ChevronRight />
  </button>
</div>