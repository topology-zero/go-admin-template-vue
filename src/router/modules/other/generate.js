// 权限相关
const router = [
    {
        path: 'generate',
        hidden: process.env.ENV == 'prod',
        name: 'generate:generate',
        component: () => import('@/views/generate/index'),
        meta: { title: '代码生成', icon: 'el-icon-s-help' }

    }
]

export default router
