import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import useDictStore from './dict'
import router from '@/router/index'
import path from 'path-browserify'

export default defineStore('user', {
    state: () => ({
        token: '',
        userInfo: {},
        authKey: [],
        permissionRoute: [],
        topNavActivePath: '',
        currentRouter: []
    }),
    actions: {
        async getUserInfo() {
            const { data } = await getUserInfo()
            this.userInfo = data
            this.authKey = data.authkeys.split(',')
            const permissionRoute = JSON.parse(JSON.stringify(router.options.routes))
            this.addPermissionRoute(permissionRoute)
            this.permissionRoute = permissionRoute

            // 登录之后，获取字典
            const dictStore = useDictStore()
            dictStore.getDict()
        },
        async login(userInfo) {
            const { data } = await login(userInfo)
            this.token = data.jwt
        },
        logout() {
            this.$reset()
        },
        addPermissionRoute(routes) {
            if (this.authKey.length == 1 && this.authKey[0] == '*') {
                return
            }
            routes.map(v => {
                if (v.permission && !this.authKey.includes(v.permission)) {
                    v.hidden = true
                }
                if (v.children) {
                    this.addPermissionRoute(v.children)
                }
            })
        },
        setTopNavActivePath(activePath) {
            this.topNavActivePath = activePath
            this.permissionRoute.map(v => {
                if (v.path == activePath) {
                    this.currentRouter = this.resetPath(JSON.parse(JSON.stringify(v.children)), path.resolve('/', v.path))
                }
            })
        },
        resetPath(routers, basePath) {
            const tags = []
            routers.forEach(r => {
                const newPath = path.resolve(basePath, r.path)
                tags.push({ ...r, path: newPath })

                if (r.children && r.children.length > 0) {
                    r.children = this.resetPath(r.children, newPath)
                }
            })
            return tags
        }
    },
    persist: {
        paths: ['token']
    }
})
