import { defineStore } from 'pinia'
import { type IUser } from '@/stores/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    lastGifId: '',
    user: {} as IUser | undefined,
  }),
})
