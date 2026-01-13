import request from '@/utils/request'

export function getCodeApi() {
    return request({
        url: '/code'
    })
}
