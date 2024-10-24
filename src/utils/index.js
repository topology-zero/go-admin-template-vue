import useUserStore from '@/store/user'

/**
 * URL转对象
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

/**
 * 对象转URL
 * @param {Object} obj
 * @returns {string}
 */
export function objToUrl(obj) {
    const tempArray = []
    const userStore = useUserStore()
    const { token } = userStore
    for (const item in obj) {
        if (obj[item] == undefined) {
            continue
        }
        if (obj[item] instanceof Array) {
            for (const index in obj[item]) {
                tempArray.push(`${item}[]=${obj[item][index]}`)
            }
        } else {
            tempArray.push(`${item}=${obj[item]}`)
        }
    }
    tempArray.push(`Authorization=${token}`)
    return tempArray.join('&')
}
