<script lang="ts">
  import { page } from "$app/stores";

  export let href: string;
</script>

<style lang="scss">
  @import "../../styles/dimensions.scss";

  a {
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;
    position: relative !important;
    white-space: nowrap;
  }

  a::after {
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
      border-radius: $borderRadiusSmall; 
  }

  a:hover::after, a.active::after {
      transform: scaleX(100%);
  }

  a::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: $borderWidth;
      background-color: currentColor;
      opacity: .1;
      bottom: $borderWidth * -1;
      border-radius: $borderRadiusSmall;
      left: 0;
  }
</style>

<a href={href} class:active={$page.url.pathname === href}>
  <slot>
    link
  </slot>
</a>