import request from '@/utils/request'

export function getList() {
    return request({
        url: '/generate'
    })
}

export function add(data) {
    return request({
        url: '/generate',
        method: 'post',
        data
    })
}
