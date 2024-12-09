export function generateSearchParams(obj: { [key: string]: string }) {
  // TODO: Remove empty values
  const searchParams = new URLSearchParams(obj)
    .toString()
    .replaceAll('+', '%20');

  return searchParams;
}
