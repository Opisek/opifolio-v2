<style lang="scss">
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  p {
      hyphens: auto;
      text-justify: inter-word;
      margin: 0;
      line-height: $fontSize * 1.4;

      @media screen and (min-width: $screenNarrow) {
        text-align: justify;
      }
  }
</style>

<p>
  <slot>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </slot>
</p>