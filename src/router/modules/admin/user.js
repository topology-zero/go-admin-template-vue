// 用户相关
const router = [
    {
        path: 'user',
        name: 'user',
        permission: 'admin:user',
        component: () => import('@/views/admin/user/index'),
        meta: { title: '用户管理', icon: 'table' }

    },
    {
        hidden: true,
        path: 'user/add',
        name: 'useradd',
        component: () => import('@/views/admin/user/add'),
        meta: { title: '添加用户', icon: 'table' }
    },
    {
        hidden: true,
        path: 'user/edit',
        name: 'useredit',
        component: () => import('@/views/admin/user/edit'),
        meta: { title: '编辑用户', icon: 'table' }
    }
]

export default router
