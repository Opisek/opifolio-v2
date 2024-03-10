<script lang="ts">
  export let src: string;

  export let href: string;

  export let site: string;
  export let handle: string;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  a {
    text-decoration: inherit;
    cursor: pointer;
  }

  figure {
    width: $contactHeight;
    height: $contactHeight;
    margin-bottom: .75 * $contactHeight;

    @media screen and (max-width: $screenNarrow) {
      display: grid;
      grid-template-columns: 1fr auto;
      width: fit-content;
      height: max-content;
      gap: $gapSmall;
      align-items: center;
      align-items: center;
      margin: 0;
      padding: 0 $paddingSmaller;
    }
  }

  div {
    width: 100%;
    height: 100%;
    background-color: $primaryBackground;
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;


    @media screen and (max-width: $screenNarrow) {
      position: static;
      background-color: transparent;
      padding: $paddingSmaller;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;

    @media screen and (max-width: $screenNarrow) {
      max-width: 20vw;
      width: 20vw;
    }
  }

  figure:hover > div {
    @media screen and (min-width: $screenNarrow) {
      transform: scale(110%);
    }
  }

  figcaption {
    z-index: 21;
    display: block;
    cursor: pointer;
    height: max-content;
    text-align: center;
    width: fit-content;

    @media screen and (min-width: $screenNarrow) {
      transform: translateY(-100%);
      width: 100%;
    }
  }

  figure:hover > figcaption {
    @media screen and (min-width: $screenNarrow) {
      transform: translateY(2em);
    }

    @media screen and (max-width: $screenNarrow) {
      color: $primaryBackground;
      background-color: $primaryForeground;
      transform: scale(110%);
    }
  }

  figcaption {
    padding: $paddingSmall;
    background-color: $secondaryBackground;
    color: $secondaryForeground;
    border-radius: 1em;
  }

  span {
    white-space: pre-wrap;
  }
</style>

<a href={href}>
  <figure>
    <div>
      <img src={src} alt={site}/>
    </div>
    <figcaption>
      <b>{site}</b>
      <span>{handle}</span>
    </figcaption>
  </figure>
</a>