import { createRouter, createWebHistory } from 'vue-router'
import StoryPage from '../components/StoryPage.vue'
import InfoPage from '../components/InfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'StoryPage',
    component: StoryPage
  },
  {
    path: '/info',
    name: 'InfoPage',
    component: InfoPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router