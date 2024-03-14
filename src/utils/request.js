import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/user'
import router from '@/router/index'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        const uStore = useUserStore()
        const { token } = uStore

        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    async response => {
        const uStore = useUserStore()

        const { data } = response
        if (data.code != 0) {
            if (data.code == 401) {
                uStore.logout()
                ElMessage.error(data.message)
                router.push('/login')
                return Promise.reject(data.message)
            }
            ElMessage.error(data.message)
            return Promise.reject(data.message)
        } else {
            return data
        }
    },
    error => {
        const { status } = error.response
        switch (status) {
            case 500:
                ElMessage.error('系统错误')
                break
            default:
                ElMessage.error('未知错误')
        }
        return Promise.reject(error)
    }
)

export default service
