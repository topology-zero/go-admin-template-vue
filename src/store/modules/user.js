import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        userInfo: {},
        authKey: [],
        userRouter: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
        state.authKey = userInfo.authkeys.split(',')

        // 设置路由
        asyncRoutes.map(v => {
            if (userInfo.authkeys == '*' || state.authKey.includes(v.permission)) {
                state.userRouter.push(v)
            }
        })
    },
    LOGOUT: (state) => {
        removeToken() // must remove  token  first
        resetRouter()
        Object.assign(state, getDefaultState())
    }
}

const actions = {
    async login({ commit }, userInfo) {
        try {
            const { data } = await login(userInfo)
            commit('SET_TOKEN', data.jwt)
            setToken(data.jwt)
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async getUserInfo({ commit, state }) {
        try {
            const { data } = await getUserInfo()
            commit('SET_USER_INFO', data)
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject(e)
        }
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

