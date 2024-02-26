<script lang="ts">
  //import Image from "../components/Image.svelte";
  import Column from "../layout/Column.svelte";

  export let src: string;
  export let alt: string = "Image";
  export let style: string = "circle";
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div.outer {
    width: 100%;
    display: grid;
    gap: $gap;
    height: max-content;

    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;

    min-height: calc(100vh - #{$navbarHeight} - 2 * #{$paddingSmall} - #{$padding});
    margin-bottom: $padding;

    @media screen and (min-width: $screenNarrow) and (max-width: $screenNormal) {
      gap: $gapSmall;  
    }

    @media screen and (max-width: $screenNarrow) {
      margin-bottom: $padding;
      min-height: calc(100vh - #{$navbarHeight} - #{$padding});
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: $gapSmaller;  
    }
  }

  div.imageContainer {
    height: 100%;
    width: 100%;
    text-align: center;
    
    @media screen and (max-width: $screenNarrow) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    } 
  }

  img {
    @media screen and (min-width: $screenNarrow) {
      max-width: calc(min(25vw, 20em));
      width: 100%;
      height: max-content;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    @media screen and (max-width: $screenNarrow) {
      height: calc(min(40vw, 15em));
    }
  }

  img.circle {
    border-radius: 50%;
  }
</style>

<div class="outer">
  <div class="imageContainer">
    <img src={src} alt={alt} class:circle={style === "circle"}/>
  </div>
  <Column>
    <slot>
    </slot>
  </Column>
</div>