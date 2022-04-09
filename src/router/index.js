import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    name: 'homeLayout',
    component: () => import('@/layout/HomeLayout.vue'),
    redirect:　'/demoPage',
    children:　[
      {
        path: 'demoPage',
        component: () => import('@/views/DemoPage.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: '#icondashboard',
          affix: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
