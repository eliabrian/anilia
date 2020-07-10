import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anime from '../views/Anime.vue'
import Character from '../views/Character.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/discover',
    name: 'Discover',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Discover.vue')
  },
  {
    path: '/anime/:id',
    name: 'Anime',
    component: Anime,
    props: true
  },

  {
    path: '/character/:id',
    name: 'Character',
    component: Character,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router