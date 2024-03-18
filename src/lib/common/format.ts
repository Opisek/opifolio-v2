export function formatHeadingId(heading: string): string {
  return encodeURIComponent(
    heading.toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll(/[^a-z0-9-\+]/g, "")
  );
}