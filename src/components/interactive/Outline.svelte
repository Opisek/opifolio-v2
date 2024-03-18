<script lang="ts">
  import MarkdownInline from "../markdown/MarkdownInline.svelte";

  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";

  export let isMarkdown: boolean = false;
  export let headings: HeadingData[];
  export let clickCallback = (() => {});
  
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
  function scroll() {
    const closestHeading = headings
      .map(x => { return {
        tag: x.tag,
        dist: headingsMap[x.tag].element.offsetTop - 100
      }})
      .filter((x) => x.dist < scrollY)
      .reduce((acc, cur) => acc.dist > cur.dist ? acc : cur, {
        tag: "",
        dist: -1
      }).tag;
    
    if (closestHeading != currentHeading) {
      if (currentHeading != "") headingsMap[currentHeading].current = false;
    }
    currentHeading = closestHeading;
    if (currentHeading != "") headingsMap[currentHeading].current = true;
  }

  afterNavigate(async () => {
    if (!browser) return;
    scrollY = window.scrollY;
    scroll();
  });
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div.outline {
    display: flex;
    flex-direction: column;
  }

  a.headingLink {
    color: $fadedForeground;
    cursor: pointer;
    text-decoration: inherit;
    width: max-content;
  }

  a.headingLink:hover {
    color: $emphasisForeground;
  }

  a.headingLink :global(> *) {
    color: inherit;
  }

  a.active {
    @media screen and (max-width: $screenNormal) {
      font-weight: $fontWeightBold;
    }
  }

  @media screen and (min-width: $screenNormal) {
    a:before {
      content: "• ";
      position: absolute;
      left: -1em;
      opacity: 0;
      transition: $animationSpeed opacity ease-out;
    }
    a.active:before {
      opacity: 1;
    }
  }
</style>

<div class="outline">
  {#each headings as heading}
    <a
      class="headingLink"
      class:active={headingsMap[heading.tag].current}
      style:margin-left={(heading.depth - 1).toString() + "em"}
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
</div>

<svelte:window on:scroll={scroll} bind:scrollY/>