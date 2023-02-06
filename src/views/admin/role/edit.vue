<template>
    <div class="app-container">
        <p class="page-title">编辑角色</p>
        <el-form ref="elForm"
                 v-loading="needloading"
                 :model="formData"
                 :rules="rules"
                 label-width="100px"
                 element-loading-background="rgba(255, 255, 255, 0.99)">
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
                         :props="treeConfig" />
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
import { edit, getDetail } from './api'
export default {
    name: 'AdminRoleEdit',
    data() {
        return {
            formData: {
                id: 0,
                name: '',
                auth: []
            },
            treeData: [],
            treeConfig: {
                label: 'name',
                children: 'child'
            },
            needloading: true,
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
            const { 'data': treeData } = await getAuths()
            this.treeData = treeData.tree

            const { 'data': roleData } = await getDetail(this.$route.query.id)
            this.formData = roleData
            this.$refs.tree.setCheckedKeys(this.formData.auth, false)
            this.needloading = false
        },
        // 提交表单
        async submitForm() {
            this.formData.auth = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            await this.$refs.elForm.validate()
            const { message } = await edit(this.$route.query.id, this.formData)
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
