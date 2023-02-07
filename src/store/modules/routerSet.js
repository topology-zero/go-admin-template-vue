import { asyncRoutes } from '@/router'

const state = {
    currentRouter: [],
    activeMenu: ''
}

const mutations = {
    SET_CURRENT_ROUTER: (state, target) => {
        state.activeMenu = target
        asyncRoutes.map(e => {
            if (e.path == target) {
                state.currentRouter = e.router
            }
        })
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

