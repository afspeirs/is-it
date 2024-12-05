const maxCharacters = 50;

export function getTitle(text: string = '') {
  const title = text
    .trim()
    .split('\n')[0]
    .replace(/#+ /g, '');

  if (title.length > 0) {
    if (title.length > maxCharacters) {
      return title
        .substring(0, maxCharacters - 3)
        .padEnd(maxCharacters, '.');
    }
    return title;
  }
  return 'Untitled';
}
