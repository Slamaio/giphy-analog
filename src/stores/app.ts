import { defineStore } from 'pinia'
import { type IUser } from '@/stores/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {} as IUser | undefined,
  }),
})
