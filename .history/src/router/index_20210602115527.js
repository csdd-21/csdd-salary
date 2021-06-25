import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'

import Home from '../views/Home.vue'
import Graphics from '../components/Graphics.vue'
import More from '../components/More.vue'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  //   children:[{
  //     path: 'graphics',
  //     name: 'graphics',
  //     component: () => import(/* webpackChunkName: "about" */ '../components/Graphics.vue')
  //   },{
  //     path: 'more',
  //     name: 'more',
  //     component: () => import(/* webpackChunkName: "about" */ '../components/More.vue')
  //   }]
  // },
  {
    path: '/home',
    // name: 'home',
    components: {
      default: Home,
      graphics: Graphics,
      more: More
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
