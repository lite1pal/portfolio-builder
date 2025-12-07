/**
 * Formats a URL by removing the https:// prefix
 */
export function stripHttpsPrefix(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

/**
 * Sorts an array of items by their date property in descending order
 */
export function sortByDateDesc<T extends Record<string, unknown>>(
  items: T[],
  dateKey: keyof T
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateKey] as Date).getTime();
    const dateB = new Date(b[dateKey] as Date).getTime();
    return dateB - dateA;
  });
}
