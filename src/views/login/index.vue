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
            <Slide class="captcha-container"
                   :data="captchaData"
                   v-show="captchaData.show"
                   ref="captchaRef"
                   :events="captchaEvent" />
            <el-button :loading="loading"
                       type="primary"
                       size="large"
                       style="width:100%;margin-bottom:30px;"
                       @click.prevent="handleLogin()">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { getCodeApi } from './api'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/user'
import 'go-captcha-vue/dist/style.css'
import { Slide } from 'go-captcha-vue'

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

const loading = ref(false)
const redirect = ref()

// 登录操作
const handleLogin = async () => {
    await loginFormRef.value.validate()
    getCode()
    captchaData.value.show = true
    loading.value = true
}

// 验证码
const captchaData = ref({ show: false })
const captchaRef = ref(null)
const getCode = async () => {
    const { data } = await getCodeApi()
    loginForm.value.codeId = data.captchaKey
    captchaData.value.thumbX = data.tileX
    captchaData.value.thumbY = data.tileY
    captchaData.value.thumbWidth = data.tileWidth
    captchaData.value.thumbHeight = data.tileHeight
    captchaData.value.image = data.imageBase64
    captchaData.value.thumb = data.tileBase64
    captchaRef.value.reset()
}
const captchaConfirm = async (point, reset) => {
    await loginFormRef.value.validate()
    loading.value = true
    try {
        loginForm.value.code = point.x + ',' + point.y
        await userStore.login(loginForm.value)
        router.push({ path: redirect.value || '/' })
    } finally {
        getCode()
    }
}

const captchaEvent = ref({
    confirm: captchaConfirm,
    refresh: getCode,
    close: () => {
        captchaData.value.show = false
        loading.value = false
    }
})

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

    .captcha-container {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
}
</style>
