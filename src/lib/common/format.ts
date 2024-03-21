export function formatHeadingId(heading: string): string {
  return encodeURIComponent(
    heading.toLowerCase()
      .replaceAll(/\s|\+/g, "-")
      .replaceAll(/[^a-z0-9-]/g, "")
  );
}

export function formatImageHref(url: URL , image: string): string {
  return url.protocol + "//" + url.host + image
}