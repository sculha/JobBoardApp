import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import JobList from '@/views/JobList.vue'
import JobDetail from '@/views/JobDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'JobList',
    component: JobList
  },
  {
    path: '/jobs/:id',
    name: 'JobDetail',
    component: JobDetail,
    props: true 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router