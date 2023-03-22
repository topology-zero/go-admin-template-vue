import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    async response => {
        const { data } = response
        if (data.code != 0) {
            if (data.code == 401) {
                store.commit('user/LOGOUT')
                return Promise.reject(data.message)
            }
            Message.error(data.message)
            return Promise.reject(data.message)
        } else {
            return data
        }
    },
    error => {
        const { status } = error.response
        switch (status) {
            case 500:
                Message.error('系统错误')
                break
            default:
                Message.error('未知错误')
        }
        return Promise.reject(error)
    }
)

export default service
