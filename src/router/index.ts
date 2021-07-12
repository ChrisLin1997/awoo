import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './map'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
