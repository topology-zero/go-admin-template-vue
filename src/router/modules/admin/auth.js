// 权限相关
const router = [
    {
        path: 'auth',
        name: 'auth',
        permission: 'admin:auth',
        component: () => import('@/views/admin/auth/index'),
        meta: { title: '权限管理', icon: 'tree' }
    }
]

export default router
