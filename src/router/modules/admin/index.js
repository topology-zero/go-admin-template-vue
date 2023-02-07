import Layout from '@/layout'
import userRouter from './user'
import roleRouter from './role'
import authRouter from './auth'

const router = {
    title: '后台管理',
    path: '/admin',
    permission: 'admin',
    router: [
        {
            path: '/admin',
            component: Layout,
            redirect: '/admin/user',
            name: 'admin',
            permission: 'admin',
            meta: { title: '后台管理', icon: 'el-icon-s-help' },
            children: [
            // 用户相关
                ...userRouter,
                // 角色相关
                ...roleRouter,
                // 权限相关
                ...authRouter
            ]
        }
    ]
}

export default router
