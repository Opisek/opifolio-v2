<script lang="ts">
  export let headings: { title: string, tag: string, depth: number }[];
  export let clickCallback = (() => {});
</script>

<style lang="scss">
  @import "../../styles/colors.scss";

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
</style>

<div class="outline">
  {#each headings as heading}
    <a
      class="headingLink"
      style:margin-left={(heading.depth - 1).toString() + "em"}
      href={"#" + heading.tag}
      on:click={clickCallback}
    >
      {heading.title}
    </a>
  {/each}
</div>