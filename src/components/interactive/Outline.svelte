<script lang="ts">
  import MarkdownInline from "../markdown/MarkdownInline.svelte";

  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";

  export let isMarkdown: boolean = false;
  export let headings: HeadingData[];
  export let clickCallback = (() => {});

  let indicator: HTMLElement;
  let windowHeight: number;
  
  let currentHeading: string = "";
  $: headingsMap = Object.fromEntries(
    headings.map(heading => {
      return [
        heading.tag,
        {
          current: false,
          element: document.getElementById(heading.tag) as HTMLElement
        }
      ];
    })
  );

  export let scrollY: number = 0;
  $: update(scrollY);
  function update(scrollY: number) {
    const bodyHeight = browser ? document.body.clientHeight : Number.MAX_VALUE;
    const reachedEnd = scrollY >= bodyHeight - windowHeight;
    
    let closestHeading;
    if (reachedEnd) {
      closestHeading = headings.length == 0 ? "" : headings[headings.length - 1].tag;
    } else {
      closestHeading = headings
        .map(x => { return {
          tag: x.tag,
          dist: headingsMap[x.tag].element.offsetTop - 100
        }})
        .filter((x) => x.dist < scrollY)
        .reduce((acc, cur) => acc.dist > cur.dist ? acc : cur, {
          tag: "",
          dist: -1
        }).tag;
    }

    if (closestHeading != currentHeading) {
      if (currentHeading != "") headingsMap[currentHeading].current = false;
      if (closestHeading != "") headingsMap[closestHeading].current = true;
      if (browser) {
        requestAnimationFrame(() => {
          const offset = document.getElementById("currentHeadingLink")?.offsetTop || 0;
          indicator.style.top = `${offset}px`;
        })
      }
    }
    currentHeading = closestHeading;
  }

  afterNavigate(async () => {
    if (!browser) return;
    scrollY = window.scrollY;
  });
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    display: flex;
    flex-direction: column;
    position: relative;
    color: $fadedForeground;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: inherit;
    width: max-content;
  }

  a:hover {
    color: $emphasisForeground;
  }

  a :global(> *) {
    color: inherit;
  }

  span {
    position: absolute;
    left: -$gapSmall;
  }

  span.hidden {
    opacity: 0;
  }

  div:has(#currentHeadingLink:hover) > span {
    color: $emphasisForeground;
  } 
</style>

<div>
  {#each headings as heading}
    <a
      style:margin-left={(heading.depth - 1).toString() + "em"}
      id={headingsMap[heading.tag].current ? "currentHeadingLink" : null}
      href={"#" + heading.tag}
      on:click={clickCallback}
    >
      {#if isMarkdown}
        <MarkdownInline text={heading.title}/>
      {:else}
        {heading.title}
      {/if}
    </a>
  {/each}
  <span
    class:hidden={currentHeading == ""}
    bind:this={indicator}
  >•</span>
</div>

<svelte:window bind:scrollY bind:innerHeight={windowHeight}/>