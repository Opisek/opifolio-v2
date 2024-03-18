<script lang="ts">
  export let header: Boolean;
  export let align: "left" | "center" | "right" | "justify" | "char" | null | undefined;
</script>

<style lang="scss">
  @import "../../styles/colors.scss";
  @import "../../styles/dimensions.scss";

  th, td {
    padding: $paddingSmaller;
    font-weight: inherit;
    font-size: inherit;
    //border: $borderWidth solid $secondaryBackground;
  }
</style>

{#if header}
  <th {align}>
    <slot/>
  </th>
{:else}
  <td {align}>
    <slot/>
  </td>
{/if}