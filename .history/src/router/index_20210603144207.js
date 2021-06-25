import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'

// import Home from '../views/Home.vue'
// import Graphics from '../components/Graphics.vue'
// import More from '../components/More.vue'

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
  {
    path: '/:home',
    name: 'HelloI18n',
    component: () => import(/* webpackChunkName: "about" */ '../components/HelloI18n.vue'),
    children:[{
      path: 'graphics',
      name: 'graphics',
      components:{
        graphics: () => import('../components/Graphics.vue')
      }
    },{
      path: 'more',
      name: 'more',
      components:{
        more: () => import('../components/More.vue')
      }
    }]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
