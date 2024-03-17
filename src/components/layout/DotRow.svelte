  <style lang="scss">
    @import "../../styles/dimensions.scss";
    @import "../../styles/media.scss";
    
    span {
      display: inline-flex;
      flex-direction: row;
      gap: $gapSmaller;
      align-items: center;
      flex-wrap: nowrap;

      @media screen and (max-width: $screenNarrow) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    span :global(> *:after) {
      @media screen and (min-width: $screenNarrow) {
        content: "•";
        margin-left: $paddingSmaller;
        position: relative;
        top: -0.03em;
      }
    }
    span :global(> :last-child:after) {
      margin-left: 0;
      content: ""
    }
  </style>

  <span>
    <slot/>
  </span>