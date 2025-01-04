import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import protectedRoute from '../middlewares/protected'
import Home from '../views/Home.vue'
import PageTwo from '../views/pageTwo.vue'
import Leaflet from '../views/Leaflet.vue'
import Parcelle from '../views/Parcelle.vue'
import GeoSvg from '../components/GeoSvg.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/parcelle/:id',
    name: 'Parcelle',
    component: Parcelle,
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: GeoSvg,
  //   // beforeEnter: protectedRoute,
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
