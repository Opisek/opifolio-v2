<script lang="ts">
  import { page } from "$app/stores";

  export let href: string;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  a {
    position: relative;
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;
  }

  span {
    position: static;
    white-space: nowrap;
    width: 100%;
  }

  span::after {
      content: "";
      display: block;
      position: absolute;
      transform: scaleX(0%);
      width: 100%;
      left: 0;
      bottom: $borderWidth * -1;
      height: $borderWidth;
      transition: transform $animationSpeedFast ease-out;
      background-color: currentColor;
      border-radius: $borderRadius; 
  }

  a:hover > span::after, span.active::after {
      transform: scaleX(100%);
  }

  span::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: $borderWidth;
      background-color: currentColor;
      opacity: .1;
      bottom: $borderWidth * -1;
      border-radius: $borderRadius;
      left: 0;
  }
</style>

<a href={href}>
  <span class:active={$page.url.pathname === href}>
    <slot>
      link
    </slot>
  </span>
</a>