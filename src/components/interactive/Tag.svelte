<script lang="ts">
  import hash from "hash.js";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { theme } from "$lib/client/theme" 

  export let tag: string;
  export let active: boolean = false;
  export let filtersPane: boolean = false;

  $: hue = parseInt(hash.sha1().update(tag).digest("hex").slice(0, 2), 16) / 255 * 360;
  $: colour = `hsl(${hue}, 10%, ${$theme == "dark" ? "22%" : "80%"})`;

  function click(event: MouseEvent) {
    if (!filtersPane) return;
    event.preventDefault();

    const searchParams = new URLSearchParams($page.url.searchParams);
    if (active) searchParams.delete("tag");
    else searchParams.set("tag", tag);
    searchParams.delete("page");
    const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

    requestAnimationFrame(() => goto(`/search${search}`));
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  a {
    text-decoration: inherit;
    padding: $paddingSmaller;
    border-radius: $borderRadius;
    color: $secondaryForeground;
    font-size: $fontSizeSmall;
    cursor: pointer;
    text-align: center;
    word-wrap: none;
    white-space: nowrap;
    border-style: solid;
    border-width: $borderWidth;
    background-color: transparent;
    z-index: 1;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
    background-color: inherit;
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    content: " ";
    top: 0;
    left: 0;
    border-radius: $borderRadius;
    z-index: -1;
  }

  span.deactivated {
    background-color: inherit;
  }

  div:hover > span.deactivated, span.active {
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
  }
</style>

<div>
  <a href={`/search?tag=${encodeURIComponent(tag)}`} style={`border-color: ${colour};`} on:click={click}>
    {tag}
  </a>
  <span style={`background-color: ${colour};`}/>
  <span class="deactivated" class:active={active}/>
</div>