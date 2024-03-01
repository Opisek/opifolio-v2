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
      margin-bottom: .5 * $contactHeight;
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
  }

  img {
    max-height: 100%;
    max-width: 100%;
  }

  figure:hover > div {
    transform: scale(110%);
  }

  figcaption {
    z-index: 21;
    width: 100%;
    transform: translateY(-100%);
    display: block;
    cursor: pointer;
    height: max-content;
    text-align: center;

    @media screen and (max-width: $screenNarrow) {
      transform: translateY(2em);
    }
  }

  figure:hover > figcaption {
    transform: translateY(2em);

    @media screen and (max-width: $screenNarrow) {
      transform: scale(110%);
      transform: translateY(calc(2em * 1.1));
      color: $primaryBackground;
      background-color: $primaryForeground;
    }
  }

  figcaption {
    padding: 1em;
    background-color: $secondaryBackground;
    color: $secondaryForeground;
    border-radius: 1em;
  }

  span {
    white-space: pre;
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