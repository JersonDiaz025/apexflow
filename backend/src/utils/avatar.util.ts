export function getAvatarInitials(name: string, length: number = 2): string {
  if (!name) return '??';

  const cleanedName = name.trim().replace(/\s+/g, ' ');
  const words = cleanedName.split(' ');

  if (words.length === 1) {
    return words[0].substring(0, length).toUpperCase();
  }

  return words
    .slice(0, length)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}
