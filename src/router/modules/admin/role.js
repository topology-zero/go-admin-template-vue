// 角色相关
const router = [
    {
        path: 'role',
        name: 'role',
        permission: 'admin:role',
        component: () => import('@/views/admin/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-s-help' }
    }
]

export default router
