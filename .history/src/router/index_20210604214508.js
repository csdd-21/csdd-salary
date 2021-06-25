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
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [{
      path: 'graphics',
      name: 'graphics',
      components: {
        graphics: () => import('../components/Graphics.vue')
      }
    }, {
      path: 'more',
      name: 'more',
      components: {
        more: () => import('../components/More.vue')
      }
    }]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(
//   (to, from, next) => {
//     let token = sessionStorage.getItem('authorization')
//     if (!token) {
//       if (to.path !== '/login') {
//         return next({ path: '/login' });
//       } else {
//         next();
//       }
//     } 
//   }
// )

export default router
