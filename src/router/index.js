import Vue from 'vue'
import VueRouter from 'vue-router'
import GearView from '@/views/GearView'
import HomeView from '@/views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GearView',
    component: GearView
  },
  {
    path: '/percents',
    name: 'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
