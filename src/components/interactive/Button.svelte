<script lang="ts">
  export let href: string | null = null;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  button {
      border: 0;
      background-color: $secondaryBackground;
      color: $secondaryForeground;
      padding: $paddingSmall;
      border-radius: $borderRadius;
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

  a {
    text-decoration: inherit;
  }
</style>

{#if href}
  <a href={href}>
    <button>
      <slot>
      </slot>
    </button>
  </a>
{:else}
  <button on:click>
    <slot>
    </slot>
  </button>
{/if}