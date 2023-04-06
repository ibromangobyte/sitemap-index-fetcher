/**
 * Capitalize the initial character of a specified string.
 * @param siteInfo 
 * @returns 
 */
export const Capitalize = (word: string): string => {
    return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
}