import request from '@/utils/request'

export function getCode() {
    return request({
        url: '/code',
        method: 'get'
    })
}

