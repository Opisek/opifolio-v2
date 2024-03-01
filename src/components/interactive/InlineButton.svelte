<script lang="ts">
  export let spin: number = 0;
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

  button.spin180:hover{
    transform: rotate(180deg);
    transition: $animationSpeed ease-out;
  }

  button.spin360:hover{
    transform: rotate(360deg);
    transition: $animationSpeed ease-out;
  }
</style>

<button on:click class:spin180={spin==180} class:spin360={spin==360}>
  <slot>
  </slot>
</button>