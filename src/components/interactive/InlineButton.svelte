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

  button:hover{
    transform: rotate(360deg);
    transition: $animationSpeed ease-out;
  }
</style>

<button on:click>
  <slot>
  </slot>
</button>