<script lang="ts">
  export let id: string | null = null;
  export let align: string = "center";
  export let mobileAlign: string = "center";
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div.inner {
    display: inline-flex;
    flex-direction: row;
    gap: $gapSmall;
    width: 100%;
    align-items: center;

    flex-wrap: wrap;

    @media(max-width: $screenNarrow) {
      flex-direction: column;
      gap: $gapSmall;
      width: fit-content;
    }
  }

  div.outer {
    @media(max-width: $screenNarrow) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  div.inner.center {
    justify-content: center;
  }
  div.inner.left {
    justify-content: left;
  }
  div.inner.right {
    justify-content: right;
  }
  @media(max-width: $screenNarrow) {
    div.inner.mobileCenter {
      align-items: center;
    }
    div.inner.mobileLeft {
      align-items: start;
    }
    div.inner.mobileRight {
      align-items: end;
    }
  }
</style>

<div class="outer">
  <div class="inner"
    id={id}
    class:center={align === "center"}
    class:left={align === "left"}
    class:right={align === "right"}
    class:mobileCenter={mobileAlign === "center"}
    class:mobileLeft={mobileAlign === "left"}
    class:mobileRight={mobileAlign === "right"}
  >
    <slot>
    </slot>
  </div>
</div>