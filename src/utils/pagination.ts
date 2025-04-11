export function paginate<T>(data: T[], page: number, itemsPerPage = 10): T[] {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }
  