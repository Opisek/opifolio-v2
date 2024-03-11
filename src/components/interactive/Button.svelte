<script lang="ts">
  export let href: string | null = null;
  export let alt: string = "";
  export let small: boolean = false;

  const id = crypto.randomUUID();
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  button {
    border: 0;
    background-color: $secondaryBackground;
    color: $secondaryForeground;
    padding: $paddingSmall;
    border-radius: $borderRadiusLarge;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    text-align: center;
    text-decoration: inherit;
    width: max-content;
    transition: $animationSpeed ease-out;
  }

  button:hover {
    background-color: $secondaryForeground;
    color: $secondaryBackground;
    transform: scale(110%);
  }

  button.small {
    padding: $paddingSmaller;
    border-radius: $borderRadius;
    font-size: $fontSizeSmall;
  }

  a {
    text-decoration: inherit;
  }
</style>

{#if href}
  <a href={href} aria-labelledby={id}>
    <button id={id} aria-label={alt || null} class:small={small}>
      <slot>
      </slot>
    </button>
  </a>
{:else}
  <button aria-label={alt || null} on:click class:small={small}>
    <slot>
    </slot>
  </button>
{/if}