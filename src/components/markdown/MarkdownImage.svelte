<script lang="ts">
  import LazyImage from "../common/LazyImage.svelte";
  import MarkdownInline from "./MarkdownInline.svelte";

  import { page } from "$app/stores";

  export let href: string;
  export let text: string;

  if (!href.startsWith("http")) {
    href = `${$page.url.pathname.split("/").pop()}/images/${href}.webp`;
  }
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  figure {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $gapSmall;
    margin: $paddingSmall 0;
  }

  figure :global(> img) {
    max-width: 30vw;
    max-height: 30vh;

    @media screen and (max-width: $screenNarrow) {
      max-width: 50vw;
      max-height: 50vh;
    }
  }
</style>

<figure>
  <LazyImage src={href} alt={text}/>
  <figcaption>
    <MarkdownInline text={text}/>
  </figcaption>
</figure>