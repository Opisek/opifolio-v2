<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import MarkdownHeading from "../../../components/markdown/MarkdownHeading.svelte";
  import MarkdownParagraph from "../../../components/markdown/MarkdownParagraph.svelte";
  import Row from "../../../components/layout/Row.svelte";
  import Paragraph from "../../../components/common/Paragraph.svelte";
  import MarkdownCode from "../../../components/markdown/MarkdownCode.svelte";
  
  export let data: { post: { markdown: string, json: any } };
</script>

<Row>
  <Paragraph>
    {data.post.json.title}
  </Paragraph>
  <Paragraph>
    Author Placeholder
  </Paragraph>
  <Paragraph>
    Date Placeholder
  </Paragraph>
</Row>
<SvelteMarkdown source={data.post.markdown} 
  renderers={{
    heading: MarkdownHeading,
    paragraph: MarkdownParagraph,
    code: MarkdownCode,
  }}
/>