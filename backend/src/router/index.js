import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/layout'

Vue.use(Router)


const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  //首页
  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    meta: {title: '首页', noCache: true},
    children: [
      {
        path: 'Home',
        component: resolve => require(['@/views/home/index'], resolve),
        name: 'Home',
        meta: {title: '首页', noCache: true},
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        // component: () => import('@/views/redirect/index')
        component: resolve => require(['@/views/redirect/index'], resolve)
      }
    ],
    meta: {title: '刷新当前页面'}
  },
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: resolve => require(['@/views/login/index'], resolve),
    hidden: true
  },
  // {
  //   path: '*',
  //   name:'notfound',
  //   component: () => import('@/views/layout/404'),
  //   hidden: true
  // },

  // { path: '*', redirect: '/', hidden: true }
  {
    path: '/error/:code',
    name: 'error',
    meta: {
      title: 'error'
    },
    component: () => import('@/views/error/index')
  },

  {
    path: '/website',
    name: 'website',
    component: Layout,
    meta: {
      title: '网站管理',
      noCache: true,
      roles: '/website',
    },
    alwaysShow: true, // will always show the root menu
    children: [
      {
        path: '',
        component: resolve => require(['@/views/website/index.vue'], resolve),
        name: 'websiteIndex',
        meta: {
          title: '网站信息设置',
          noCache: true,
          roles: '/website/index'
        },
      },
    ]
  },
  {
    path: '/game',
    component: Layout,
    meta: {
      title: '游戏管理',
      noCache: true,
    },
    alwaysShow: true, // will always show the root menu
    children: [
      {
        path: 'type',
        component: resolve => require(['@/views/game/index.vue'], resolve),
        name: 'gameType',
        meta: {
          title: '游戏分类',
          noCache: true,
        }
      },
      {
        path: 'list',
        component: resolve => require(['@/views/game/list.vue'], resolve),
        name: 'gameList',
        meta: {
          title: '游戏列表',
          noCache: true,
        }
      },
      {
        path: ':name',
        component: resolve => require(['@/views/game/detail_list.vue'], resolve),
        name: 'gameDetailList',
        hidden:true,
        meta: {
          title: '详情',
          noCache: true,
        },
      },
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: Layout,
    meta: {
      title: '产品管理',
      noCache: true,
      roles: '/product',
    },
    alwaysShow: true, // will always show the root menu
    children: [
      {
        path: '',
        component: resolve => require(['@/views/product/index.vue'], resolve),
        name: 'productIndex',
        meta: {
          title: '产品维护',
          noCache: true
        },
      }
    ]
  },


  //权限管理
  {
    path: '/authority_management',
    component: Layout,
    redirect: '/authority_management/set',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '权限管理',
      roles: '/authority_management/set'
    },
    children: [
      {
        path: 'set',
        component: () => import('@/views/authority/set'),
        name: 'set',
        meta: {
          title: '权限设置',
          roles: '/authority_management/set'
        }
      },
      {
        path: 'set_user',
        name: 'set_user_index',
        redirect: '/authority_management/set',
        component: () => import('@/views/authority/set_user_index'),
        meta: {
          title: '用户管理',
          roles: '/authority_management/set'
        },
        hidden: true,
        children: [
          {
            path: '',
            component: () => import('@/views/authority/set_user'),
            name: 'set_user',
            meta: {
              title: '用户详情',
              roles: '/authority_management/set'
            },
          },

        ]
      },
    ]
  },

]


export default new Router({
  // mode: process.env.srconfig == 'testdev'?'hash':'history', // require service support
  // base:'/approveweb/',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
]
