import { createRouter, createWebHashHistory } from 'vue-router'
import { useConversation } from '@/store/conversation'
import Home from '@/views/Home.vue'
import Conversation from '@/views/Conversation.vue'
import Setting from '@/views/Setting.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
router.beforeEach((to) => {
  const store = useConversation()
  if (!to.path.startsWith('/Conversation')) {
    store.selectedId = -1
  }
})
export default router
