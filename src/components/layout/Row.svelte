<script lang="ts">
  export let id: string | null = null;
  export let align: string = "center";
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    display: inline-flex;
    flex-direction: row;
    gap: $gapSmaller;
    width: 100%;
    align-items: center;

    flex-wrap: wrap;

    @media(max-width: $screenNarrow) {
      flex-direction: column;
      gap: $gapSmaller;
    }
  }

  div.center {
    justify-content: center;
  }
  div.left {
    justify-content: left;
  }
  div.center {
    justify-content: right;
  }
</style>

<div
  id={id}
  class:center={align === "center"}
  class:left={align === "left"}
  class:rigth={align === "right"}
>
  <slot>
  </slot>
</div>