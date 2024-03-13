<script lang="ts">
  import { page } from "$app/stores";
    import SvelteMarkdown from "svelte-markdown";
    import Link from "../interactive/Link.svelte";
    import MarkdownText from "./MarkdownText.svelte";
    import MarkdownCodeSpan from "./MarkdownCodeSpan.svelte";
    import MarkdownEmphasis from "./MarkdownEmphasis.svelte";
    import MarkdownBold from "./MarkdownBold.svelte";

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

  img {
    max-width: 30vw;
    max-height: 30vh;

    @media screen and (max-width: $screenNarrow) {
      max-width: 50vw;
      max-height: 50vh;
    }
  }
</style>

<figure>
  <img src={href} alt={text}/>
  <figcaption>
    <SvelteMarkdown isInline source={text}
      renderers={{
        link: Link,
        text: MarkdownText,
        codespan: MarkdownCodeSpan,
        em: MarkdownEmphasis,
        strong: MarkdownBold
      }}
    />
  </figcaption>
</figure>