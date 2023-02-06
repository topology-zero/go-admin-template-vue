<template>
    <div class="app-container">
        <p class="page-title">编辑用户</p>
        <el-form ref="elForm"
                 v-loading="needloading"
                 :model="formData"
                 :rules="rules"
                 label-width="100px"
                 element-loading-background="rgba(255, 255, 255, 0.99)">
            <el-form-item label="用户名"
                          prop="username">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="formData.password"
                          placeholder="不输入则不修改"
                          type="password" />
            </el-form-item>
            <el-form-item label="所属角色"
                          prop="roleId">
                <el-select v-model="formData.roleId"
                           style="width:100%">
                    <el-option v-for="val, key in roleOptions"
                               :key="key"
                               :label="val.name"
                               :value="val.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="真实姓名"
                          prop="realname">
                <el-input v-model="formData.realname" />
            </el-form-item>
            <el-form-item label="电话号码"
                          prop="phone">
                <el-input v-model="formData.phone" />
            </el-form-item>
            <el-form-item label="用户状态"
                          prop="status">
                <el-radio-group v-model="formData.status">
                    <el-radio :label="0"
                              border>封停</el-radio>
                    <el-radio :label="1"
                              border>正常</el-radio>
                </el-radio-group>
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
import { getRoles } from '@/api/common'
import { edit, getDetail } from './api'
export default {
    name: 'AdminUserEdit',
    data() {
        return {
            formData: {
                username: '',
                password: '',
                realname: '',
                roleId: [],
                status: 1,
                phone: ''
            },
            roleOptions: [],
            rules: {
                username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
                password: [/* { required: true, trigger: 'blur', message: '请输入密码' } */],
                realname: [{ required: true, trigger: 'blur', message: '请输入真实姓名' }],
                roleId: [{ required: true, trigger: 'blur', message: '请选择角色' }],
                status: [{ required: true, trigger: 'blur', type: 'enum', enum: [0, 1], message: '请设置用户状态' }],
                phone: [{ required: true, trigger: 'blur', max: 12, message: '请输入合法电话号码' }]
            },
            needloading: true
        }
    },
    watch: {
        // 只允许输入数字
        'formData.phone': function(newVal, oldVal) {
            this.formData.phone = newVal.replace(/\D/g, '')
        }
    },
    created() {
        if (!this.$route.query.id) {
            this.back()
        }
        this.init()
    },
    methods: {
        // 初始化
        async init() {
            this.needloading = true
            const { 'data': roleData } = await getRoles()
            this.roleOptions = roleData.data
            const { 'data': userData } = await getDetail(this.$route.query.id)
            this.formData = userData
            this.needloading = false
        },
        // 提交表单
        async submitForm() {
            await this.$refs.elForm.validate()
            const { message } = await edit(this.$route.query.id, this.formData)
            this.$message.success(message)
            this.back()
        },
        // 返回
        back() {
            this.$router.push('/admin/user')
        }
    }
}
</script>
