<script lang="ts">
  import searchIcon from "$lib/assets/icons/search.png";

  import InlineIconButton from "./InlineIconButton.svelte";

  let inputElement: HTMLElement;

  function focus() {
    inputElement.focus();
  }
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  input {
    border: 0;
    outline: 0;
    color: $secondaryForeground;
    background-color: $secondaryBackground;
    border-radius: $borderRadiusSmall;
    min-width: 4em;
    font-size: $fontSizeSmall;
    height: auto;
    padding: $paddingSmaller;
  }

  span {
    width: max-content;
    gap: $gapSmaller;
    display: flex;
    flex-direction: row;
  }
</style>

<span>
  <input type="text" placeholder="Search" bind:this={inputElement}/>
  <InlineIconButton on:click={focus} src={searchIcon} alt="Search"/>
</span>