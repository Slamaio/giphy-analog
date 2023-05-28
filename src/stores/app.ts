import { defineStore } from 'pinia'
import type { IUser } from 'env'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {} as IUser | undefined,
    copyAlert: 'none' as 'none' | 'success' | 'error',
    searchQuery: '',
    page: 1,
  }),
})
