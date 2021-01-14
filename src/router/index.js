import Vue from 'vue'
import VueRouter from 'vue-router'
import kwick from '../pages/Kwick.page.vue'
import PageNotFound from '../components/shared/PageNotFound.page.vue'
import Users from '../pages/Users.page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: { name: 'kwick' }
  },
  {
    path: '/kwick',
    name: 'Kwick',
    component: kwick
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '*', name: 'PageNotFound', component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router