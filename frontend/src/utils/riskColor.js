// riskColor — returns Tailwind color class based on risk level
export function riskColor(level) {
  if (level === 'Safe') return 'text-green-500';
  if (level === 'Suspicious') return 'text-yellow-500';
  if (level === 'Danger') return 'text-red-500';
  return 'text-gray-400';
}
