<script lang="typescript">
  //import Image from "../components/Image.svelte";
  import Column from "./Column.svelte";

  export let src: string;
  export let alt: string = "Image";
</script>

<style lang="scss">
  @import "../styles/dimensions.scss";
  @import "../styles/media.scss";

  div.outer {
    width: 100%;
    min-height: calc(100vh - #{$navbarHeight});
    display: grid;
    gap: $gap;

    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    padding-bottom: $padding;

    @media screen and (max-width: $screenNarrow) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: $gapSmall;
      padding-bottom: 0;
    }
  }

  div.imageContainer {
    height: 100%;
    width: 100%;
    text-align: center;
    
    @media screen and (max-width: $screenNarrow) {
      height: max-content;
    } 
  }

  img {
    border-radius: 50%;

    @media screen and (min-width: $screenNarrow) {
      max-width: 20vw;
      width: 100%;
      height: max-content;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    @media screen and (max-width: $screenNarrow) {
      height: calc(min(40vw, 10em));
    }
  }
</style>

<div class="outer">
  <div class="imageContainer">
    <img src={src} alt={alt}/>
  </div>
  <Column>
    <slot>
    </slot>
  </Column>
</div>