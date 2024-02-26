<script lang="ts">
  export let src: string;
  export let alt: string = "Image";
  
  export let style: string = "circle";
</script>

<style lang="scss">
  div {
    height: 100%;
    width: 100%;
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    max-width: 20vw;
  }

  img.circle {
    border-radius: 50%;
  }
</style>

<div>
  <img src={src} alt={alt} class:circle={style == "circle"}/>
</div>