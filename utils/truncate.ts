export const capitalizeFirstLetter = (word?: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase();
};

export const firstFiveLetters = (word?: string): string => {
  if (!word) return '';
  if (word.length <= 5) return word;

  return word.slice(0, 5) + '...';
};


