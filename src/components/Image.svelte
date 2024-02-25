<script lang="typescript">
  export let src: string;
  export let alt: string = "Image";
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

    border-radius: 50%;
    max-width: 20vw;
  }
</style>

<div>
  <img src={src} alt={alt}/>
</div>