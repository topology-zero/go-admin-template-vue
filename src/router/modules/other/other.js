// 权限相关
const router = [
    {
        path: 'dashboard',
        name: 'Dashboard',
        permission: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据统计', icon: 'dashboard' }
    }
]

export default router
