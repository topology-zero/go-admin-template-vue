import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/admin/auth',
        params
    })
}

export function add(data) {
    return request({
        url: '/admin/auth',
        method: 'post',
        data
    })
}

export function edit(id, data) {
    return request({
        url: '/admin/auth/' + id,
        method: 'put',
        data
    })
}

export function del(id) {
    return request({
        url: '/admin/auth/' + id,
        method: 'delete'
    })
}
