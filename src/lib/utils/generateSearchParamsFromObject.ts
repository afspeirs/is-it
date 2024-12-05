// export function generateSearchParams(obj: { [key: string]: string }) {
//   return new URLSearchParams(Object.entries(obj)).toString();
// }


export function generateSearchParams(obj: { [key: string]: string }) {
  const searchParams = new URLSearchParams(obj)
    .toString()
    .replaceAll('+', '%20');

  return searchParams;
}
