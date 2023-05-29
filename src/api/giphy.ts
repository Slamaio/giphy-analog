import { get, type IApiResponse } from '@/api/http'

const apiKey = import.meta.env.VITE_GIPHY_API_KEY
const apiBase = 'https://api.giphy.com/v1/gifs'

export interface IGiphy {
  gifs: IGif[]
  totalCount: number
}

export interface IGif {
  id: string
  url: string
  title: string
  user?: IUser
  images: {
    original: { url: string }
    original_still: { url: string }
    fixed_height: { url: string }
    fixed_height_still: { url: string }
  }
}

export interface IUser {
  avatar_url: string
  profile_url: string
  username: string
  display_name: string
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

      const gifs = res.data
      let totalCount = res.pagination!.total_count

      // Trending gifs returns faulty pagination, this is to account for that.
      totalCount = await this.getRealTotalCount(totalCount)

      return { gifs, totalCount }
    } catch (error) {
      console.error(error)
    }
  },

  async getRealTotalCount(initialTotalCount: number) {
    const res = await get<IGif[]>(EndpointsUrls.trending, {
      api_key: apiKey,
      rating: 'g',
      limit: 1,
      offset: initialTotalCount,
    })
    const totalCount = res.pagination!.total_count
    return totalCount
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

      const gifs = res.data
      const totalCount = res.pagination!.total_count

      return { gifs, totalCount }
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
