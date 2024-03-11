<script lang="ts">
  import Search from "./Search.svelte";
  import Tag from "./Tag.svelte";
  import TagRow from "../layout/TagRow.svelte";
    import Button from "./Button.svelte";
    import Center from "../layout/Center.svelte";

  export let currentTag: string | null;
  export let tags: string[];
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";
  
  div {
    display: flex;
    flex-direction: column;
    gap: $gapSmaller;
    background-color: inherit;
  }
</style>

<div>
  <Search/>
  <TagRow>
    {#each tags as tag}
      <Tag tag={tag} active={tag === currentTag} filtersPane={true}/>
    {/each}
  </TagRow>
  <Center>
    <Button href="/search" small={true}>
      Clear all filters
    </Button>
  </Center>
</div>