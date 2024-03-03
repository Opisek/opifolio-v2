  <style lang="scss">
    @import "../../styles/dimensions.scss";
    @import "../../styles/media.scss";
    
    span {
      width: 100%;

      display: inline-flex;
      flex-direction: row;
      gap: $paddingSmaller;
      align-items: center;
      flex-wrap: nowrap;

      @media screen and (max-width: $screenNarrow) {
        flex-direction: row;
        align-items: start;
        flex-wrap: wrap;
      }
    }

    span :global(> *:after) {
      @media screen and (min-width: $screenNarrow) {
        margin-left: $paddingSmaller;
        content: "•";
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