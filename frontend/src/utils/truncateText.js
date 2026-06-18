// truncateText — shortens text to a preview length
export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
