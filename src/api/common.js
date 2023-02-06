import request from '@/utils/request'

export function getRoles() {
    return request({
        url: '/base/role',
        method: 'get'
    })
}

export function getAuths() {
    return request({
        url: '/base/auth',
        method: 'get'
    })
}

