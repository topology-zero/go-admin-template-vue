// 用户相关
const router = [
    {
        path: 'user',
        name: 'user',
        permission: 'admin:user',
        component: () => import('@/views/admin/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-s-help' }

    }
]

export default router
