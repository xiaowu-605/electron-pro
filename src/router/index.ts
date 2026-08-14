import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Conversation from '@/views/Conversation.vue'
import Setting from '@/views/Setting.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/Conversation',
      component: Conversation,
    },
    {
      path: '/Setting',
      component: Setting,
    },
  ],
})

export default router
