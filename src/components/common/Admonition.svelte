<script lang="ts">
  import InfoIcon from "lucide-svelte/icons/info";
  import WarningIcon from "lucide-svelte/icons/alert-triangle";
  import ErrorIcon from "lucide-svelte/icons/bug";
  import SuccessIcon from "lucide-svelte/icons/check";
  import ExampleIcon from "lucide-svelte/icons/list";

  export let type: string;
  export let title: string | null;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    color: $secondaryForeground;
    background-color: $secondaryBackground;
    padding: $paddingSmall;
    border-radius: $borderRadius;
    display: flex;
    flex-direction: column;
    gap: $gapSmaller;

    @media screen and (min-width: $screenNarrow) {
      text-align: justify;
      margin: 0 $paddingSmall;
    }
  }

  @each $type in map-keys($colors) {
    div.#{$type} {
      color: map-get(map-get($colors, $type), "foreground");
      background-color: map-get(map-get($colors, $type), "background");
    }
  }

  span.title {
    display: flex;
    flex-direction: row;
    gap: $gapSmaller;
    align-items: center;
    font-weight: $fontWeightBold;
  }
</style>

<div class="{type}">
  <span class="title">
    {#if type === "info"}
      <InfoIcon/>
    {:else if type === "warning"}
      <WarningIcon/>
    {:else if type === "error"}
      <ErrorIcon/>
    {:else if type === "success"}
      <SuccessIcon/>
    {:else if type === "example"}
      <ExampleIcon/>
    {/if}
    {#if title}
      {title}
    {:else}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    {/if}
  </span>
  <slot>Lorem Ipsum</slot>
</div>