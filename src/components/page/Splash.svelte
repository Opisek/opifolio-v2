<script lang="ts">
  import Column from "../layout/Column.svelte";
  import LazyImage from "../common/LazyImage.svelte";

  export let src: string;
  export let alt: string = "Image";
  export let style: string = "circle";
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  section {
    width: 100%;
    display: grid;
    gap: $gapLarge;
    height: max-content;

    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;

    min-height: calc(100vh - #{$navbarHeight} - 2 * #{$paddingSmall} - #{$padding});
    margin-bottom: $padding;

    @media screen and (min-width: $screenNarrow) and (max-width: $screenNormal) {
      gap: $gap;  
    }

    @media screen and (max-width: $screenNarrow) {
      margin-bottom: $padding;
      min-height: calc(100vh - #{$navbarHeightSmall} - #{$padding});
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: $gapSmall;  
    }
  }

  div {
    height: 100%;
    width: 100%;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    
    @media screen and (max-width: $screenNarrow) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    } 
  }

  div :global(> img) {
    @media screen and (min-width: $screenNarrow) {
      max-width: calc(min(25vw, 20em));
      width: 100%;
      height: max-content;
    }

    @media screen and (max-width: $screenNarrow) {
      height: calc(min(40vw, 15em));
    }
  }

  div :global(> img.circle) {
    border-radius: 50%;
  }
</style>

<section>
  <div>
    <LazyImage src={src} alt={alt} class={style} height={500} lazy={false}/>
  </div>
  <Column>
    <slot>
    </slot>
  </Column>
</section>