<template>
    <div class="login-container">
        <div class="login-img">
            <svg-icon icon-class="login"
                      style="height:100%; width:100%" />
        </div>
        <el-form ref="loginFormRef"
                 :model="loginForm"
                 class="login-form"
                 label-position="left">
            <div class="title-container">
                <h3 class="title">后台管理系统</h3>
            </div>
            <el-form-item prop="username"
                          :rules="{ required: true, trigger: 'blur', message: '请输入用户名' }">
                <el-input v-model="loginForm.username"
                          placeholder="用户名">
                    <template #prepend>
                        <svg-icon icon-class="user" />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password"
                          :rules="{ required: true, trigger: 'blur', min: 6, message: '长度至少为6位' }">
                <el-input v-model="loginForm.password"
                          type="password"
                          placeholder="密码"
                          show-password
                          @keyup.enter="handleLogin()">
                    <template #prepend>
                        <svg-icon icon-class="password" />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code"
                          :rules="{ required: true, trigger: 'blur', len: 4, message: '请输入正确的验证码长度' }">
                <el-input v-model="loginForm.code"
                          placeholder="验证码"
                          @keyup.enter="handleLogin()">
                    <template #prepend>
                        <svg-icon icon-class="verify" />
                    </template>
                </el-input>
                <span class="show-virify"
                      @click="getCode()">
                    <img :src="codeImage">
                </span>
            </el-form-item>
            <el-button :loading="loading"
                       type="primary"
                       style="width:100%;margin-bottom:30px;"
                       @click.prevent="handleLogin()">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { getCodeApi } from './api'
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref()

const loginForm = ref({
    username: '',
    password: '',
    codeId: '',
    code: ''
})
const codeImage = ref()
const loading = ref(false)
const redirect = ref()

onMounted(() => getCode())

// 登录操作
const handleLogin = async () => {
    await loginFormRef.value.validate()
    loading.value = true
    try {
        await userStore.login(loginForm.value)
        router.push({ path: redirect.value || '/' })
    } finally {
        getCode()
        loading.value = false
    }
}

// 获取验证码
const getCode = async () => {
    const { data } = await getCodeApi()
    loginForm.value.codeId = data.id
    codeImage.value = data.image
}

// 监听路由变化
watch(
    () => route.query,
    (query) => { redirect.value = query && query.redirect },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
.login-container {
    min-height: 100%;
    width: 100%;
    background-color: #66b1ff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-input-group) {
        height: 47px;
        .el-input__inner {
            height: 47px;
        }
    }

    .login-img {
        height: 500px;
        width: 650px;
    }

    .login-form {
        position: relative;
        width: 420px;
        max-width: 100%;
        background: #fff;
        border-radius: 5px;
        padding: 50px 35px 0;
        overflow: hidden;
        margin-left: 150px;
        margin-right: 10%;
    }
    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: #66b1ff;
            margin: 0px auto 40px auto;
            text-align: center;
        }
    }

    .show-virify {
        position: absolute;
        right: 2px;
        top: 2px;
        bottom: 2px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;

        img {
            border-radius: 2px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
