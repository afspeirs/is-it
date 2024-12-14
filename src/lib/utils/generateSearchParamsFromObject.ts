export function generateSearchParams(obj: { [key: string]: string }) {
  const searchParams = new URLSearchParams(obj)
    .toString()
    // .replaceAll('+', '%20')
    .replace(/(?:&|^)[^&]*?=(?=&|$)/g, '');

  return searchParams;
}
