/// <reference types="vite/client" />

export interface IGif {
  id: string
  title: string
  user: {
    avatar_url: string
    profile_url: string
    username: string
  }
  images: {
    original: {
      url: string
    }
    downsized: {
      url: string
    }
  }
}

export interface IApiOptions {
  [key: string]: string
}
