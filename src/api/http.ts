export interface IApiResponse<T> {
  data: T
  pagination?: { total_count: number }
}

export interface IApiOptions {
  [key: string]: string | number
}

export function apiOptions(options: IApiOptions) {
  const query = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return query
}

export async function get<T>(apiUrl: string, options: IApiOptions = {} as IApiOptions) {
  const res = await fetch(`${apiUrl}?${apiOptions(options)}`)
  const processedRes = (await res.json()) as IApiResponse<T>
  return processedRes
}
