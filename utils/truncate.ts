export const capitalizeFirstLetter = (word?: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase();
};

export function truncateId(id: string, length: number): string {
  return id.length > length ? `${id.slice(0, length)}...` : id;
}