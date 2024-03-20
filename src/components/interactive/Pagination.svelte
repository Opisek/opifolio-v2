<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let currentPage: number = 1;
  let lastPage: number = 1;
  export let pageCount: number;

  $: url = $page.url;

  afterNavigate(async () => {
    currentPage = Number.parseInt(url.searchParams.get("page") || "1");
    lastPage = currentPage;
    if (currentPage < 1) changePage(1);
  });

  function changePage(page: number): void {
    page = Math.min(Math.max(page, 1), pageCount);
    if (page == lastPage) {
      currentPage = page;
      return;
    }
    lastPage = page;

    const searchParams = new URLSearchParams(url.searchParams);
    searchParams.set("page", page.toString());
    const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    
    requestAnimationFrame(() => goto(`${url.pathname}${search}`));
  }

  function buttonPress(event: MouseEvent, page: number): void {
    event.preventDefault();
    changePage(page);
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  form {
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
    color: $disabledForeground;
  }

  input {
    all: unset;
    appearance: textfield;
    text-align: center;
    margin-left: -0.5ch;
    margin-right: -$gapSmall;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  span {
    color: $fadedForeground;
    pointer-events: none;
  }
</style>

<form>
  <button
    aria-label="Previous Page"
    class:disabled={currentPage <= 1}
    on:click={(e) => buttonPress(e, currentPage - 1)}
  >
    <ChevronLeft />
  </button>

  <input
    bind:value={currentPage} 
    style:width={(currentPage.toString().length + 1) + "ch"}
    type="number"
    min="1"
    max="{pageCount}"
    aria-label="Current Page"
    on:change={() => changePage(currentPage)}
  />
  <span>
    of {pageCount}
  </span>

  <button
    aria-label="Next Page"
    class:disabled={currentPage >= pageCount}
    on:click={(e) => buttonPress(e, currentPage + 1)}
  >
    <ChevronRight />
  </button>
</form>