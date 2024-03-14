<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened"
                   class="hamburger-container"
                   @toggleClick="appStore.toggleSideBar" />

        <top-nav v-if="useTopNav" />

        <breadcrumb v-else
                    class="breadcrumb-container" />

        <div class="right-menu">
            <div class="user-info">
                <div class="name">{{ userInfo.realname }}</div>
                <div class="role">{{ userInfo.rolename }}</div>
            </div>
            <el-dropdown class="avatar-container"
                         trigger="click">
                <div class="avatar-wrapper">
                    <svg-icon icon-class="avatar"
                              class="user-avatar"></svg-icon>
                    <i class="el-icon-caret-bottom" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <router-link to="/">
                            <el-dropdown-item>
                                回到首页
                            </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided
                                          @click="editPwd()">
                            <span style="display:block;">修改密码</span>
                        </el-dropdown-item>
                        <el-dropdown-item divided
                                          @click="logout">
                            <span style="display:block;">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-dialog v-model="showDialog"
                   title="修改登录密码"
                   width="30%">
            <el-form ref="elFormRef"
                     :model="formData"
                     label-width="100px">
                <el-form-item label="原密码"
                              :rules="{ required: true, trigger: 'blur', message: '原密码不得少于6位数' }"
                              prop="oldPassword">
                    <el-input v-model="formData.oldPassword"
                              type="password"
                              show-password />
                </el-form-item>
                <el-form-item label="新密码"
                              :rules=" { required: true, trigger: 'blur', min: 6, message: '新密码不得少于6位数' }"
                              prop="newPassword">
                    <el-input v-model="formData.newPassword"
                              type="password"
                              show-password />
                </el-form-item>
                <el-form-item label="确认密码"
                              :rules="{ required: true, trigger: 'blur', min: 6, message: '确认密码不得少于6位数' }"
                              prop="confirmPassword">
                    <el-input v-model="formData.confirmPassword"
                              type="password"
                              show-password />
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="showDialog = false">取消</el-button>
                    <el-button type="primary"
                               @click="submitForm()">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import TopNav from '@/components/TopNav/index.vue'
import { changePwd } from '@/api/user'
import { ref } from 'vue'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// store
const appStore = useAppStore()
const userStore = useUserStore()
const { userInfo } = userStore
const { sidebar, useTopNav } = appStore

// route
const router = useRouter()

// refs
const elFormRef = ref()

// data
const showDialog = ref(false)
const formData = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const editPwd = () => {
    showDialog.value = true
    elFormRef.value?.resetFields()
}

const submitForm = async () => {
    await elFormRef.value.validate()
    if (formData.value.newPassword != formData.value.confirmPassword) {
        ElMessage.error('两次输入的密码不一致')
        return
    }
    try {
        await changePwd(formData.value)
        ElMessage.success('修改密码成功')
    } finally {
        showDialog.value = false
    }
}

const logout = () => {
    userStore.logout()
    router.push(`/login`)
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    justify-content: space-between;

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        flex: 1;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;
        display: flex;

        .user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height: 25px;
            margin: 5px 10px 5px 5px;

            .name {
                height: 50%;
                font-size: 12px;
            }

            .role {
                transform: scale(0.7);
                height: 50%;
                font-size: 12px;
            }
        }

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
