import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            hidden: true
        },
        {
            path: '/404',
            component: () => import('@/views/404.vue'),
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            // 如果设置了 useTopNav = true ,则需要每个路由都设置 meta
            // meta: { title: '首页' },
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/dashboard/index.vue'),
                    meta: { title: '首页', icon: 'dashboard', affix: true }
                }
            ]
        },
        {
            path: '/admin',
            component: Layout,
            redirect: '/admin/user',
            name: 'admin',
            permission: 'admin',
            meta: { title: '后台管理', icon: 'manage' },
            children: [
                // 用户相关
                {
                    path: 'user',
                    name: 'user',
                    permission: 'admin:user',
                    component: () => import('@/views/admin/user/index.vue'),
                    meta: { title: '用户管理', icon: 'user' }
                },
                // 角色相关
                {
                    path: 'role',
                    name: 'role',
                    permission: 'admin:role',
                    component: () => import('@/views/admin/role/index.vue'),
                    meta: { title: '角色管理', icon: 'role' }
                },
                // 权限相关
                {
                    path: 'auth',
                    name: 'auth',
                    permission: 'admin:auth',
                    component: () => import('@/views/admin/auth/index.vue'),
                    meta: { title: '权限管理', icon: 'auth' }
                }
            ]
        },
        {
            path: '/redirect',
            component: Layout,
            hidden: true,
            children: [
                {
                    path: '/redirect/:path(.*)',
                    component: () => import('@/views/redirect/index.vue')
                }
            ]
        },
        // 404 page must be placed at the end !!!
        { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
    ]
})

export default router
