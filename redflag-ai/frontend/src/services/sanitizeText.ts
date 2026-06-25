export const sanitizeText = (input: string): string => {
  return input
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror=/gi, "")
    .replace(/onclick=/gi, "")
    .trim();
};