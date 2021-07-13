export const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/components/news-list.vue'),
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: () => import('@/components/news-detail.vue'),
  },
]