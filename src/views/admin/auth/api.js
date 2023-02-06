import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/auth',
        params
    })
}

export function add(data) {
    return request({
        url: '/auth',
        method: 'post',
        data
    })
}

export function edit(id, data) {
    return request({
        url: '/auth/' + id,
        method: 'put',
        data
    })
}

export function del(id) {
    return request({
        url: '/auth/' + id,
        method: 'delete'
    })
}
