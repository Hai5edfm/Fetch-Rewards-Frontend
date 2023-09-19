export const getMaxPages = (total: number, limit: number) =>
  Math.ceil(total / limit);
