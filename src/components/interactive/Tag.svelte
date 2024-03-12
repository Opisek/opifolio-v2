<script lang="ts">
  import hash from "hash.js";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let tag: string;
  export let active: boolean = false;
  export let filtersPane: boolean = false;

  const hue = parseInt(hash.sha1().update(tag).digest("hex").slice(0, 2), 16) / 255 * 360;
  const colour = `hsl(${hue}, 10%, 22%)`;

  function click(event: MouseEvent) {
    if (!filtersPane) return;
    event.preventDefault();
    const query = $page.url.searchParams.get('query');
    requestAnimationFrame(() => goto(`/search?tag=${encodeURIComponent(tag)}${query ? `&query=${encodeURIComponent(query)}` : ""}`));
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
    width: fit-content;
    height: fit-content;
    word-wrap: none;
    white-space: nowrap;
    border-style: solid;
    border-width: $borderWidth;
    background-color: transparent;
    z-index: 1;
    margin: 0;
  }

  div {
    width: fit-content;
    height: fit-content;
    position: relative;
    z-index: 10;
    background-color: inherit;
    margin: 2 * $borderWidth 0;
  }

  span {
    position: absolute;
    width: 100%;
    height: calc(100% + #{3.5 * $borderWidth});
    content: " ";
    display: block;
    top: -1.3 * $borderWidth;
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
    top: calc(50% + #{0.5 * $borderWidth});
  }
</style>

<div>
  <a href={`/search?tag=${encodeURIComponent(tag)}`} style={`border-color: ${colour};`} on:click={click}>
    {tag}
  </a>
  <span style={`background-color: ${colour};`}/>
  <span class="deactivated" class:active={active}/>
</div>