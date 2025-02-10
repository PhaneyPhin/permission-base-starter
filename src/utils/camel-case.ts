export const toCamelCase = (str: string): string => {
  if (!str) return str;
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace("-", "").replace("_", "")
  );
};
