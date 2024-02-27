<script>
  import portraitImage from "$lib/assets/portrait.png";
  import githubLogo from "$lib/assets/logos/github.png";
  import linkedinLogo from "$lib/assets/logos/linkedin.png";
  import youtubeLogo from "$lib/assets/logos/youtube.png";

  import Button from "../components/interactive/Button.svelte";
  import Link from "../components/interactive/Link.svelte";
  import Paragraph from "../components/common/Paragraph.svelte";
  import Row from "../components/layout/Row.svelte";
  import Splash from "../components/page/Splash.svelte";
  import Title from "../components/common/Title.svelte";
  import ImageLink from "../components/interactive/ImageLink.svelte";
</script>

<Splash src={portraitImage} alt="Portrait Photo">
  <Title>Hi, welcome to my blog!</Title>
  <Paragraph>
    My name's Kacper Darowski, also known as Opisek.
    I'm a computer science student at the Technical University of Munich, who's been fascinated with programming ever since the age of nine!
    My areas of interest are theoretical computer science, algorithmics as well as low-level and embedded development.
    On top of that, I love writing open-source code, like <Link href="/git/opifolio-v2">this very website</Link>!
  </Paragraph>
  <Row>
    <Button href="#social">See more</Button>
    <!--<Button>Projects</Button>-->
  </Row>
</Splash>

<Row id="social">
  <ImageLink src={githubLogo} site="GitHub" handle="Opisek" href="github"/>
  <ImageLink src={linkedinLogo} site="LinkedIn" handle="Kacper Darowski" href="linkedin"/>
  <ImageLink src={youtubeLogo} site="YouTube" handle="Opisek" href="youtube"/>
</Row>