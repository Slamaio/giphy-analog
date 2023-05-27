import { type IApiOptions } from 'env'

export function apiOptions(options: IApiOptions) {
  const query = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return query
}

export async function get<T>(apiUrl: string, options: IApiOptions = {} as IApiOptions) {
  const res = await fetch(`${apiUrl}?${apiOptions(options)}`)
  const { data } = await res.json()
  return data as T
}
