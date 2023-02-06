import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/user',
        params
    })
}

export function getDetail(id) {
    return request({
        url: '/user/' + id,
        method: 'get'
    })
}

export function add(data) {
    return request({
        url: '/user',
        method: 'post',
        data
    })
}

export function edit(id, data) {
    return request({
        url: '/user/' + id,
        method: 'put',
        data
    })
}

export function del(id) {
    return request({
        url: '/user/' + id,
        method: 'delete'
    })
}
