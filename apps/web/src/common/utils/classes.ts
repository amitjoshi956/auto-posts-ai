/**
 *
 * @param args - Record of class names and boolean values
 * @returns string of class names that are true
 *
 * @example
 * classes({
 *   'class-name-1': isLoading && !isPending,
 *   'class-name-2': isPending,
 *   'class-name-3': isError,
 *   'class-name-4': !isLoading && !isPending && !isError,
 * })
 */
export const classes = (args: Record<string, boolean>) => {
  return Object.entries(args)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
};
