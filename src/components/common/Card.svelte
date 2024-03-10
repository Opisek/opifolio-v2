<script lang="ts">
  import DotRow from "../layout/DotRow.svelte";
  import Header from "./Header.svelte";
  import Tag from "../interactive/Tag.svelte";

  export let post: PostData;
  export let compact: boolean = false;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  a {
    display: grid;

    grid-template-columns: $thumbnailWidth 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas: "thumbnail title tags" "thumbnail summary summary" "thumbnail details details";

    grid-column-gap: 2 * $gapSmaller;
    grid-row-gap: $gapSmaller;

    background-color: $darkerBackground;
    padding: $paddingSmall;
    border-radius: $borderRadius;
    text-decoration: inherit;
    color: inherit;

    @media screen and (max-width: $screenVeryNarrow) {
      grid-template-columns: $thumbnailWidthSmall 1fr;
      grid-template-rows: auto auto auto auto;
      //grid-template-areas: "thumbnail title" "thumbnail summary" "details details" "tags tags";
      grid-template-areas: "thumbnail title" "thumbnail tags" "summary summary" "details details";
    }
  }

  a.compact {
    width: $cardWidth;
    grid-template-columns: $thumbnailWidthSmall 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas: "thumbnail title" "summary summary" "details details";

    @media screen and (max-width: $screenNarrow){
      width: 100%;
      grid-template-areas: "title title" "summary summary" "details details";
    }
  }

  a:hover {
    transform: scale(103%);
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
  
  img {
    width: $thumbnailWidth;
    height: $thumbnailWidth;
    border-radius: 50%;
    object-fit: cover;

    @media screen and (max-width: $screenVeryNarrow) {
      width: $thumbnailWidthSmall;
      height: $thumbnailWidthSmall;
    }
  }

  img.compact {
    width: $thumbnailWidthSmall;
    height: $thumbnailWidthSmall;
  }

  div.titleWrapper {
    grid-area: title;
    display: flex;
    align-items: center;
  }

  div.tags {
    grid-area: tags;
    display: flex;
    gap: $gapSmaller;
    justify-content: start;
    flex-wrap: wrap;
    background-color: inherit;
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
</style>

<a href={`blog/${post.id}`} class:compact={compact}>
  <div class="thumbnailWrapper" class:compact={compact}>
    <img src={post.thumbnail} alt="Thumbnail" class:compact={compact}/>
  </div>
  <div class="titleWrapper">
    <Header level={compact ? 4 : 3}>
      {post.title}
    </Header>
  </div>
  {#if !compact}
    <div class="tags">
      {#each post.tags as tag}
        <Tag tag={tag} />
      {/each}
    </div>
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
</a>