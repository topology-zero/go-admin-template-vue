import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: '/base/userInfo',
        method: 'get'
    })
}

export function changePwd(data) {
    return request({
        url: '/base/changeSelfPwd',
        method: 'post',
        data
    })
}

