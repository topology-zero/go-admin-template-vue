import request from '@/utils/request'

export function getRoles() {
    return request({
        url: '/base/role'
    })
}

export function getAuths() {
    return request({
        url: '/base/auth'
    })
}
