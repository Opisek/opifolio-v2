<script lang="ts"></script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";
  @import "../../styles/media.scss";

  div {
    width: 100%;
    background-color: $darkerBackground;
    color: $darkerForeground;
    padding: $padding $paddingSmall;
    margin-top: $padding;
    display: flex;
    flex-direction: row;
    gap: $gap;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $screenNarrow) {
      padding: $padding;
      flex-direction: column;
    }
  }
</style>

<div>
  <slot>
  </slot>
</div>