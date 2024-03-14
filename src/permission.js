import router from './router'
import useUserStore from './store/user'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const { token, userInfo } = userStore

    NProgress.start()
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = userInfo.id
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    userStore.logout()
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
