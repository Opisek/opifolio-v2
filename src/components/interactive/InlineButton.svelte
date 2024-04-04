<script lang="ts">
  export let spin: number = 0;
  export let alt: string = "";
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  button {
    outline: 0;
    border: 0;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    transition: none;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @each $deg in 45, 90, 180, 360 {
    button.spin#{$deg}:hover {
      transform: rotate(#{$deg}deg);
      transition: $animationSpeed ease-out;
    }
  }
</style>

{#if alt != ""}
  <button on:click class={`spin${spin}`} aria-label={alt}>
    <slot>
    </slot>
  </button>
{:else}
  <button on:click class={`spin${spin}`}>
    <slot>
    </slot>
  </button>
{/if}