import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // route level code-splitting
    // this generates a separate chunk (statistics.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
