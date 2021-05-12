import { createRouter, createWebHashHistory } from 'vue-router'
import StateList from '@/components/StateList'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'StateList',
            component: StateList
        }
    ]
})