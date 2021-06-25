import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    redirect:'/login'
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[{
      path: '/graphics',
      name: 'graphics',
      component: () => import(/* webpackChunkName: "about" */ '../components/Graphics.vue')
    }]
  },
  {
    path: '/graphics',
    name: 'graphics',
    component: () => import(/* webpackChunkName: "about" */ '../components/Graphics.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
