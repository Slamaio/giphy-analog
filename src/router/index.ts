import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/gifs/:gifId',
      name: 'gifs',
      component: () => import('@/views/GifsView.vue'),
    },
  ],
})

export default router
