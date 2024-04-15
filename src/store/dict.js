import { defineStore } from 'pinia'
import { getRoles, getAuths } from '@/api/common'

// 数据字典
export default defineStore('dict', {
    state: () => ({
        roleOptions: [],
        authTreeData: []
    }),
    actions: {
        async getDict() {
            await Promise.all([
                this.getRoles(),
                this.getAuths()
            ])
        },
        async getRoles() {
            const { data } = await getRoles()
            this.roleOptions = data
        },
        async getAuths() {
            const { data } = await getAuths()
            this.authTreeData = data
        }
    }
})
