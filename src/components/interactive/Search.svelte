<script lang="ts">
  import InlineButton from "./InlineButton.svelte";
  import SearchIcon from "lucide-svelte/icons/search";

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
    border-radius: $borderRadius;
    min-width: 4em;
    font-size: $fontSizeSmall;
    height: auto;
    padding: $paddingSmaller;
  }

  span {
    width: max-content;
    gap: $gapSmall;
    display: flex;
    flex-direction: row;
  }
</style>

<span>
  <input type="text" placeholder="Search" bind:this={inputElement}/>
  <InlineButton on:click={focus} spin={360} alt="Search">
    <SearchIcon/>
  </InlineButton>
</span>