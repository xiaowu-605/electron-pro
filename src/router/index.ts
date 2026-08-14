import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    {
      path: '/Conversation',
      component: () => import('@/views/Conversation.vue'),
    },
    {
      path: '/Setting',
      component: () => import('@/views/Setting.vue'),
    },
  ],
})

export default router
