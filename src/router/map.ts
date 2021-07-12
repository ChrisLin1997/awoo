export const routes = [
  {
    path: '/',
    component: () => import('@/components/news-list.vue'),
  },
  {
    path: '/detail/:id',
    component: () => import('@/components/news-detail.vue'),
  },
]