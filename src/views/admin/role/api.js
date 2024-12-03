import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/admin/role',
        params
    })
}

export function getDetail(id) {
    return request({
        url: '/admin/role/' + id,
        method: 'get'
    })
}

export function add(data) {
    return request({
        url: '/admin/role',
        method: 'post',
        data
    })
}

export function edit(id, data) {
    return request({
        url: '/admin/role/' + id,
        method: 'put',
        data
    })
}

export function del(id) {
    return request({
        url: '/admin/role/' + id,
        method: 'delete'
    })
}
