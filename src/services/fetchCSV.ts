import Papa from "papaparse";

export async function fetchCSV<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (error: any) => reject(error),
    });
  });
}
