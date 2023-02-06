<template>
    <div class="app-container">
        <p class="page-title">添加角色</p>
        <el-form ref="elForm"
                 :model="formData"
                 :rules="rules"
                 label-width="100px">
            <el-form-item label="角色名"
                          prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="权限"
                          prop="auth">
                <el-tree ref="tree"
                         :data="treeData"
                         node-key="id"
                         default-expand-all
                         show-checkbox
                         :props="treeConfig"
                         @check="setAuth" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm()">提交</el-button>
                <el-button @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getAuths } from '@/api/common'
import { add } from './api'
export default {
    name: 'AdminRoleAdd',
    data() {
        return {
            formData: {
                name: '',
                auth: []
            },
            treeData: [],
            treeConfig: {
                label: 'name',
                children: 'child'
            },
            rules: {
                name: [{ required: true, trigger: 'blur', message: '请输入角色名' }],
                auth: [{ type: 'array', required: true, min: 1, message: '请选择权限' }]
            }
        }
    },
    created() {
        this.getRoles()
    },

    methods: {
        // 初始化，获取所有角色
        async getRoles() {
            const { data } = await getAuths()
            this.treeData = data.tree
        },
        setAuth(data, { checkedKeys, halfCheckedKeys }) {
            this.formData.auth = checkedKeys.concat(halfCheckedKeys)
        },
        // 提交表单
        async submitForm() {
            await this.$refs.elForm.validate()
            const { message } = await add(this.formData)
            this.$message.success(message)
            this.back()
        },
        // 返回
        back() {
            this.$router.push('/admin/role')
        }
    }
}
</script>
