import { createRouter, createWebHistory } from 'vue-router'
import StoryPage from '../components/StoryPage.vue'
import InfoPage from '../components/InfoPage.vue'
import GoogleMapScraper from '../components/GoogleMapScraper.vue'

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
  },
  {
    path: '/google-map-scraper',
    name: 'GoogleMapScraper',
    component: GoogleMapScraper
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router