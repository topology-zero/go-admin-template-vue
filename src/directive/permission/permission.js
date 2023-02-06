import store from '@/store'

export default {
    inserted(el, { value }, vnode) {
        const hasAuth = store.getters && store.getters.authKey
        if (!hasAuth) {
            throw new Error(`权限 authKey 不存在,请先获取用户信息`)
        }
        if (hasAuth.length == 1 && hasAuth[0] == '*') {
            return
        }
        if (value && typeof value == 'string') {
            if (!hasAuth.includes(value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`need auth-keys! Like v-permission="admin-user-add"`)
        }
    }
}
