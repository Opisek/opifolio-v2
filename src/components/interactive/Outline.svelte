<script lang="ts">
  export let headings: { title: string, tag: string, depth: number }[];
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
    headingsMap[currentHeading].current = true;
  }
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
    color: $primaryForeground;
  }

  a.active {
    @media screen and (max-width: $screenNormal) {
      font-weight: $fontWeightBold;
    }
  }

  a.active:before {
    @media screen and (min-width: $screenNormal) {
      content: "• ";
      position: absolute;
      left: -1em;
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
      {heading.title}
    </a>
  {/each}
</div>

<svelte:window on:scroll={scroll} bind:scrollY/>