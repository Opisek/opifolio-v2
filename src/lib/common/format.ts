export function formatHeadingId(heading: string): string {
  return encodeURIComponent(
    heading.toLowerCase()
      .replaceAll(/\s|\+/g, "-")
      .replaceAll(/[^a-z0-9-]/g, "")
  );
}