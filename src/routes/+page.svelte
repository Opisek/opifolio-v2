<script>
  import portrait from "$lib/assets/portrait.png";

  import Button from "../components/interactive/Button.svelte";
  import Link from "../components/interactive/Link.svelte";
  import Paragraph from "../components/Paragraph.svelte";
  import Row from "../components/layout/Row.svelte";
  import Splash from "../components/page/Splash.svelte";
  import Title from "../components/Title.svelte";
</script>

<Splash src={portrait} alt="Portrait Photo">
  <Title>Hi, welcome to my blog!</Title>
  <Paragraph>
    My name's Kacper Darowski, also known as Opisek.
    I'm a computer science student at the Technical University of Munich, who's been fascinated with programming ever since the age of nine!
    My areas of interest are theoretical computer science, algorithmics as well as low-level and embedded development.
    On top of that, I love writing open-source code, like <Link href="/git/opifolio-v2">this very website</Link>!
  </Paragraph>
  <Row>
    <Button>Media Presence</Button>
    <Button>Projects</Button>
  </Row>
</Splash>

<Title>Hi</Title>
<Paragraph/>

<Title>Hi</Title>
<Paragraph/>
