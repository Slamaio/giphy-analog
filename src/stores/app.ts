import { defineStore } from 'pinia'
import type { IUser } from '@/api/giphy'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {} as IUser | undefined,
    copyAlert: 'none' as 'none' | 'success' | 'error',
    searchQuery: '',
    page: 1,
  }),
})
