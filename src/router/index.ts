import { createRouter, createWebHistory } from 'vue-router'
import Main from 'views/Main.vue'
import Blogs from 'views/Blogs.vue'
import BlogDetail from 'views/BlogDetail.vue'
import Home from 'views/Home.vue'
import AboutMe from 'views/aboutMe.vue'

const routes = [
  {
    path: '',
    name: 'main',
    component: Main,
    meta: {
      title: '抹上一抹凉'
    },
    children: [
      {
        path: '/blog',
        name: 'blog',
        component: Blogs,
        meta: {
          title: '抹上一抹凉 - 随笔列表'
        }
      },
      
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '抹上一抹凉'
        }
      },
      {
        path: '/blogDetail',
        name: 'blogDetail',
        component: BlogDetail,
        meta: {
          title: '抹上一抹凉 - 文章详情'
        }
      },
      {
        path: '/aboutMe',
        name: 'aboutMe',
        component: AboutMe,
        meta: {
          title: '抹上一抹凉 - 关于我'
        }
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由跳转前判断
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  if (to.path === '/') {
    next({
      path: '/home'
    })
  } else {
    next()
  }
})

export default router
