<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened"
                   class="hamburger-container"
                   @toggleClick="toggleSideBar" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <div class="user-info">
                <div class="name">{{ userInfo.realname }}</div>
                <div class="role">{{ userInfo.rolename }}</div>
            </div>
            <el-dropdown class="avatar-container"
                         trigger="click">
                <div class="avatar-wrapper">
                    <img :src="require('@/assets/avatar.svg')"
                         class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown"
                                  class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            回到首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided
                                      @click.native="reset()">
                        <span style="display:block;">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided
                                      @click.native="logout">
                        <span style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog :visible.sync="showDialog"
                   title="修改登录密码"
                   width="30%">
            <el-form ref="elForm"
                     :model="formData"
                     :rules="rules"
                     label-width="100px">
                <el-form-item label="原密码"
                              prop="oldPassword">
                    <el-input v-model="formData.oldPassword"
                              :type="passwordType"
                              placeholder="不得少于6位数" />
                    <span class="show-pwd"
                          @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
                <el-form-item label="新密码"
                              prop="newPassword">
                    <el-input v-model="formData.newPassword"
                              :type="passwordType"
                              placeholder="不得少于6位数" />
                    <span class="show-pwd"
                          @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
                <el-form-item label="确认密码"
                              prop="confirmPassword">
                    <el-input v-model="formData.confirmPassword"
                              :type="passwordType"
                              placeholder="不得少于6位数" />
                    <span class="show-pwd"
                          @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary"
                           @click="submitForm()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changePwd } from '@/api/user'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    data() {
        return {
            showDialog: false,
            passwordType: 'password',
            formData: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                oldPassword: [{ required: true, trigger: 'blur', message: '请输入原密码' }],
                newPassword: [{ required: true, trigger: 'blur', min: 6, message: '请输入新密码' }, { required: true, trigger: 'blur', min: 6, message: '请输入新密码' }],
                confirmPassword: [{ required: true, trigger: 'blur', min: 6, message: '请输入确认密码' }, { required: true, trigger: 'blur', min: 6, message: '请输入确认密码' }]
            }
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'userInfo'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        reset() {
            this.showDialog = true
            this.formData = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        },
        showPwd() {
            this.passwordType = this.passwordType === 'password' ? '' : 'password'
        },
        async submitForm() {
            if (this.formData.newPassword != this.formData.confirmPassword) {
                this.$message.error('两次输入的密码不一致')
                return
            }
            try {
                await changePwd(this.formData)
                this.$message.success('修改密码成功')
            } finally {
                this.showDialog = false
            }
        },
        logout() {
            this.$store.commit('user/LOGOUT')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
    }

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
        float: left;
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
