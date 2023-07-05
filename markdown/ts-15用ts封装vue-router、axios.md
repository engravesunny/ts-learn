# 用ts封装vue-router和axios

## 封装vue-router

```ts
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
const Home: any = () => import('../views/Home/Home.vue')
const Check: any = () => import('../views/Check/Check.vue')
const Apply: any = () => import('../views/Apply/Apply.vue')
const Sign: any = () => import('../views/Sign/Sign.vue')
const Login: any = () => import('../views/Login/Login.vue')
const Exception: any = () => import('../views/Exception/Exception.vue')

// meta接口定义
declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean
    title?: string
    icon?: string
    auth?: boolean
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/sign',
    component: Home,
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: '/apply',
        name: 'apply',
        component: Apply,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true,
        }
      },
      {
        path: '/exception',
        name: 'exception',
        component: Exception,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true,
        }
      },
      {
        path: '/sign',
        name: 'sign',
        component: Sign,
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true
        },
      },
      {
        path: '/check',
        name: 'check',
        component: Check,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true,
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  next()
})

export default router
```

## 封装axios

```ts
import axios from 'axios'
import type { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { baseURL, timeout } from './config'

enum ResMsg {
  errcode = 0
}

// ./config.ts引入
const config = {
  baseURL,
  timeout
}

const token = localStorage.getItem('TOKEN') || ''

class Request {
  service
  constructor(config: CreateAxiosDefaults<any>) {
    this.service = axios.create(config)
    this.service.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
      return {
        ...config,
        headers: {
          Authorization: token
        }
      } as InternalAxiosRequestConfig
    }, (error: any) => {
      return Promise.reject(error)
    })
    this.service.interceptors.response.use((config: AxiosResponse<any, any>) => {
      // const { errcode }: any = config.data
      // if (errcode !== ResMsg.errcode)
      //   ElMessage.error('操作失败')
      return config
    }, (error: any) => {
      Promise.reject(error)
    })
  }

  get(url: string, params?: object) {
    return this.service.get(url, { params })
  }

  post(url: string, params?: object) {
    return this.service.post(url, params)
  }

  put(url: string, params?: object) {
    return this.service.put(url, params)
  }

  delete(url: string, params?: object) {
    return this.service.delete(url, { params })
  }
}

export default new Request(config)

```
