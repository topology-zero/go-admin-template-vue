// 角色相关
const router = [
    {
        path: 'role',
        name: 'role',
        permission: 'admin:role',
        component: () => import('@/views/admin/role/index'),
        meta: { title: '角色管理', icon: 'tree' }
    }, {
        hidden: true,
        path: 'role/add',
        name: 'roleadd',
        component: () => import('@/views/admin/role/add'),
        meta: { title: '添加角色', icon: 'table' }
    },
    {
        hidden: true,
        path: 'role/edit',
        name: 'roleedit',
        component: () => import('@/views/admin/role/edit'),
        meta: { title: '编辑角色', icon: 'table' }
    }
]

export default router
