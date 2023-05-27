import { get } from '@/api/http'
import { type IGif } from 'env'
import { type IApiOptions, type IApiResponse } from '@/api/http'

const apiKey = import.meta.env.VITE_GIPHY_API_KEY
const apiBase = 'https://api.giphy.com/v1/gifs'

export interface IGiphy {
  gifs: IGif[]
  total_count: number
}

export enum EndpointsUrls {
  trending = apiBase + '/trending',
  random = apiBase + '/random',
  search = apiBase + '/search',
  id = apiBase,
}

export default {
  async fetchRandomGif() {
    try {
      const res = await get<IGif>(EndpointsUrls.random, {
        api_key: apiKey,
        rating: 'g',
      })
      return res.data
    } catch (error) {
      console.error(error)
    }
  },

  async fetchTrendingGifs(limit: number = 25, offset: number = 0) {
    try {
      const res = await get<IGif[]>(EndpointsUrls.trending, {
        api_key: apiKey,
        rating: 'g',
        limit: String(limit),
        offset: String(offset),
      })
      return { gifs: res.data, total_count: res.pagination?.total_count }
    } catch (error) {
      console.error(error)
    }
  },

  async searchGifs(query: string, limit: number = 25, offset: number = 0) {
    try {
      let res = await get<IGif[]>(EndpointsUrls.search, {
        api_key: apiKey,
        rating: 'g',
        q: query,
        limit: limit,
        offset: offset,
      })

      if (!res.data.length) {
        res = (await this.fetchNotFoundGifs(limit)) as IApiResponse<IGif[]>
      }

      return { gifs: res.data, total_count: res.pagination?.total_count }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchGifById(id: string) {
    try {
      const res = await get<IGif>(`${EndpointsUrls.id}/${id}`, {
        api_key: apiKey,
      })
      return res.data
    } catch (error) {
      console.error(error)
    }
  },

  async fetchNotFoundGifs(limit: number = 25) {
    try {
      const res = await get<IGif[]>(EndpointsUrls.search, {
        api_key: apiKey,
        rating: 'g',
        q: 'not found',
        limit: limit,
        offset: 0,
      })
      return res
    } catch (error) {
      console.error(error)
    }
  },
}
