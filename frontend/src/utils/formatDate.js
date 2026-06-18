// formatDate — converts ISO datetime to readable string
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
