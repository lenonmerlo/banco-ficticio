export function paginate<T>(data: T[], page: number, itemsPerPage = 10): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  return data.slice(startIndex, startIndex + itemsPerPage);
}
