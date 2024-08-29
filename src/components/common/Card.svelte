<script lang="ts">
  import DotRow from "../layout/DotRow.svelte";
  import Header from "./Header.svelte";
  import LazyImage from "./LazyImage.svelte";
  import Tag from "../interactive/Tag.svelte";
  import TagRow from "../layout/TagRow.svelte";
    import Bold from "./Bold.svelte";
    import PseudoHeader from "./PseudoHeader.svelte";

  export let post: PostData;
  export let compact: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  a {
    display: grid;
    position: relative;
    background-color: $darkerBackground;

    grid-template-columns: $thumbnailWidth auto auto;
    grid-template-rows: auto auto auto;
    grid-template-areas: "thumbnail title tags" "thumbnail summary summary" "thumbnail details details";

    grid-column-gap: 2 * $gapSmaller;
    grid-row-gap: $gapSmaller;

    padding: $paddingSmall;
    border-radius: $borderRadius;
    text-decoration: inherit;
    color: inherit;

    @media screen and (max-width: $screenVeryNarrow) {
      grid-template-columns: $thumbnailWidthSmall 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "thumbnail title" "thumbnail tags" "summary summary" "details details";
    }
  }

  a:hover {
    background-color: $primaryBackground;
  }

  a.compact {
    min-width: $cardWidth;
    grid-template-columns: $thumbnailWidthSmall 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "thumbnail title" "summary summary" "details details";

    @media screen and (max-width: $screenNarrow){
      width: 100%;
      grid-template-areas: "title title" "summary summary" "details details";
    }
  }

  div.thumbnailWrapper {
    grid-area: thumbnail;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.thumbnailWrapper.compact {
    @media screen and (max-width: $screenNarrow) {
      display: none
    }
  }
  
  div.thumbnailWrapper :global(> img) {
    width: $thumbnailWidth;
    height: $thumbnailWidth;
    border-radius: 50%;
    object-fit: cover;

    @media screen and (max-width: $screenVeryNarrow) {
      width: $thumbnailWidthSmall;
      height: $thumbnailWidthSmall;
    }
  }

  div.thumbnailWrapper :global(> img.compact) {
    width: $thumbnailWidthSmall;
    height: $thumbnailWidthSmall;
  }

  div.titleWrapper {
    grid-area: title;
    display: flex;
    align-items: center;
  }

  summary {
    grid-area: summary;
  }
  
  summary.compact {
    @media screen and (max-width: $screenNarrow) {
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      //white-space: nowrap;
    }
  }

  aside {
    color: $fadedForeground;
    grid-area: details;
    display: flex;
    justify-content: end;
    width: 100%;

    @media screen and (max-width: $screenNarrow) {
      font-size: $fontSizeSmall;
    }
  }

  a > * {
    z-index: 3;
  }
  
  div.background {
    position: absolute;
    border-radius: $borderRadius;
    background-color: $darkerBackground;
    z-index: 2;

    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  a:hover > div.background {
    height: calc(100% - #{2 * $borderWidth});
    width: calc(100% - #{2 * $borderWidth});
    left: $borderWidth;
    top: $borderWidth;
    background-color: $primaryBackground;
  }

  div.border {
    position: absolute;
    border-radius: $borderRadius;
    background-color: $secondaryBackground;
    z-index: 1;

    height: calc(100% - #{2 * $borderWidth});
    width: calc(100% - #{2 * $borderWidth});
    left: $borderWidth;
    top: $borderWidth;
  }

  a:hover > div.border {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>

<a href={`blog/${post.id}`} class:compact={compact}>
  <div class="thumbnailWrapper" class:compact={compact}>
    <LazyImage src={post.thumbnail} alt="Thumbnail" class={compact ? "compact" : ""}/>
  </div>
  <div class="titleWrapper">
    <PseudoHeader>
      {post.title}
    </PseudoHeader>
  </div>
  {#if !compact}
    <TagRow right={true}>
      {#each post.tags as tag}
        <Tag tag={tag} />
      {/each}
    </TagRow>
  {/if}
  <summary class:compact={compact}>
    {post.summary}
  </summary>
  <aside>
    {#if compact}
      <span>
        {new Date(post.timestamp).toLocaleDateString()}
      </span>
    {:else}
      <DotRow>
        <span>
          {post.author}
        </span>
        <span>
          {new Date(post.timestamp).toLocaleDateString()}
        </span>
      </DotRow>
    {/if}
  </aside>
  <div class="border"/>
  <div class="background"/>
</a>