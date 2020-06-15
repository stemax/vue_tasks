import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'create',
    component: () => import( '../views/Create.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import( '../views/List.vue')
  },
  {
      path: '/task:id',
      name: 'task',
      component: () => import( '../views/Task.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
