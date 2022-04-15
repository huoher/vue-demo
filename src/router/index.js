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
          title: '首页',
          icon: '#icondashboard'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户',
      icon: '#icondashboard'
    },
    component: () => import('@/layout/HomeLayout.vue'),
    children: [
      {
        path: 'userList',
        name: 'userList',
        meta: {
          title: '用户列表',
          icon: '#icondashboard'
        }
      },
      {
        path: 'userList123123',
        name: 'userList1312312',
        meta: {
          title: '用户列表1312312',
          icon: '#icondashboard'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      icon: '#icondashboard'
    },
    component: () => import('@/layout/HomeLayout.vue'),
    children:　[
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/DemoPage.vue'),
        meta: {
          title: '关于系统',
          icon: '#icondashboard'
        }
      },
      {
        path: 'about11',
        name: 'about111',
        component: () => import('@/views/DemoPage.vue'),
        meta: {
          title: '关于系统111',
          icon: '#icondashboard'
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
