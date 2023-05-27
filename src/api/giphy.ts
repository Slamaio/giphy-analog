import { get } from '@/api/http'
import { type IGif } from 'env'

const apiKey = import.meta.env.VITE_GIPHY_API_KEY
const apiBase = 'https://api.giphy.com/v1/gifs/'

export enum EndpointsUrls {
  trending = apiBase + 'trending',
  random = apiBase + 'random',
  search = apiBase + 'search',
  id = apiBase,
}

export default {
  async fetchRandomGif() {
    try {
      const gif = await get<IGif>(EndpointsUrls.random, {
        api_key: apiKey,
        rating: 'g',
      })
      return gif
    } catch (error) {
      console.error(error)
    }
  },
}
