<script lang="ts">
  import hash from "hash.js";

  export let tag: string;

  const hue = parseInt(hash.sha1().update(tag).digest("hex").slice(0, 2), 16) / 255 * 360;
  const colour = `hsl(${hue}, 10%, 22%)`;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  a {
    text-decoration: inherit;
    padding: $paddingSmaller;
    border-radius: $borderRadius;
    color: $secondaryForeground;
    font-size: $fontSizeSmall;
    cursor: pointer;
    text-align: center;
    width: fit-content;
    height: fit-content;
    word-wrap: none;
    white-space: nowrap;
    border-style: solid;
    border-width: $borderWidth;
    background-color: transparent;
    z-index: 1;
    margin: 0;
  }

  div {
    width: fit-content;
    height: fit-content;
    position: relative;
    z-index: 10;
    background-color: inherit;
  }

  a:hover {
    transform: scale(110%);
  }

  span {
    position: absolute;
    width: 100%;
    height: calc(100% + #{3 * $borderWidth});
    content: " ";
    display: block;
    top: -1.25 * $borderWidth;
    left: 0;
    border-radius: $borderRadius;
    z-index: -1;
  }

  span.deactivated {
    background-color: inherit;
  }

  div:hover > span.deactivated {
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
  }
</style>

<div>
  <a href={`/search?tags=${encodeURIComponent(tag)}`} style={`border-color: ${colour};`}>
    {tag}
  </a>
  <span style={`background-color: ${colour};`}/>
  <span class="deactivated"/>
</div>