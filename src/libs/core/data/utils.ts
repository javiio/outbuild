import type { Data } from './types';

export const uid = (seed?: string) => {
  const sanitizedSeed = seed
    ? `${seed.substring(0, 11)}` // Take the first 11 characters if available
        .replace(/[^a-zA-Z0-9 ]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
    : '';

  const a = sanitizedSeed ? `${sanitizedSeed}-` : '';
  const b = Math.floor(Math.random() * Date.now()).toString(16);
  return `${a}${b}`;
};

export const removeDuplicates = <T extends Data | string>(array: T[]) => {
  if (typeof array[0] === 'string') {
    return Array.from(new Set(array as string[]));
  } else {
    const seen = new Set<string>();
    return (array as T[]).filter((item) => {
      const id = (item as Data).id;
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  }
};
