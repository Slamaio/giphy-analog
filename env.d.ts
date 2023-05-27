/// <reference types="vite/client" />

export interface IGif {
  id: string
  url: string
  title: string
  user?: IUser
  images: {
    original: {
      url: string
    }
    fixed_height: {
      url: string
    }
    fixed_height_still: {
      url: string
    }
  }
}

export interface IUser {
  avatar_url: string
  profile_url: string
  username: string
}
