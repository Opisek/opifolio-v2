<script>
  import { afterNavigate } from "$app/navigation";

  afterNavigate(() => {
    console.log("nav");
  })
</script>