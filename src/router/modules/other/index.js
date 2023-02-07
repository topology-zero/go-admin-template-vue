import Layout from '@/layout'
import otherRouter from './other'

const router = {
    title: '其他管理',
    path: '/other',
    permission: 'other',
    router: [
        {
            path: '/other',
            component: Layout,
            redirect: '/other/dashboard',
            name: 'admin',
            permission: 'other',
            meta: { title: '后台管理', icon: 'el-icon-s-help' },
            children: [
                ...otherRouter
            ]
        }
    ]
}

export default router
