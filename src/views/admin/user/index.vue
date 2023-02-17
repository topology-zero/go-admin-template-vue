<template>
    <div class="app-container">
        <p class="page-title">用户列表</p>
        <div class="filter-container">
            <el-button v-permission="`admin:user:add`"
                       type="primary"
                       size="small"
                       plain
                       @click="handleAdd()">
                添加用户
            </el-button>
        </div>
        <el-table v-loading="table_loading"
                  element-loading-text="加载中..."
                  border
                  :data="list">
            <el-table-column label="ID"
                             prop="id"
                             align="center"
                             width="60px" />
            <el-table-column align="center"
                             label="用户名"
                             prop="username" />
            <el-table-column align="center"
                             label="手机号"
                             prop="phone" />
            <el-table-column align="center"
                             label="真实姓名"
                             prop="realname" />
            <el-table-column align="center"
                             label="所属角色"
                             prop="rolename" />
            <el-table-column align="center"
                             label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 1"
                            type="success">正常</el-tag>
                    <el-tag v-else
                            type="danger">停封</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template slot-scope="{row}">
                    <el-button v-permission="`admin:user:edit`"
                               size="mini"
                               type="primary"
                               @click="handleEdit(row)">编辑
                    </el-button>
                    <el-button v-if="row.id != 1"
                               v-permission="`admin:user:del`"
                               size="mini"
                               type="danger"
                               @click="handleDel(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background
                           :current-page.sync="params.page"
                           :page-sizes="page_sizes"
                           :page-size="params.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
        </div>
        <el-dialog :title="formDataId == 0 ? '添加用户' : '编辑用户'"
                   :visible.sync="dialogVisible"
                   width="30%">
            <el-form ref="elForm"
                     :model="formData"
                     label-width="100px">
                <el-form-item label="用户名"
                              :rules="{ required: true, trigger: 'blur', message: '请输入用户名' }"
                              prop="username">
                    <el-input v-model="formData.username" />
                </el-form-item>
                <el-form-item label="密码"
                              :rules="{ required: formDataId == 0, trigger: 'blur', message: '请输入密码' }"
                              prop="password">
                    <el-input v-model="formData.password"
                              :placeholder="formDataId == 0 ? '': '不输入则不修改'"
                              type="password" />
                </el-form-item>
                <el-form-item label="所属角色"
                              :rules="{ required: true, trigger: 'blur', message: '请选择角色' }"
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
                              :rules="{ required: true, trigger: 'blur', message: '请输入真实姓名' }"
                              prop="realname">
                    <el-input v-model="formData.realname" />
                </el-form-item>
                <el-form-item label="电话号码"
                              :rules="{ required: true, trigger: 'blur', max: 12, message: '请输入合法电话号码' }"
                              prop="phone">
                    <el-input v-model="formData.phone" />
                </el-form-item>
                <el-form-item label="用户状态"
                              :rules="{ required: true, trigger: 'blur', type: 'enum', enum: [0, 1], message: '请设置用户状态' }"
                              prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="0"
                                  border>封停</el-radio>
                        <el-radio :label="1"
                                  border>正常</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const defaultFormData = () => {
    return {
        username: '',
        password: '',
        realname: '',
        roleId: '',
        status: 1,
        phone: ''
    }
}
import { getRoles } from '@/api/common'
import { getList, add, edit, del, getDetail } from './api'
import { pageMixin } from '@/utils/mixin'
export default {
    name: 'AdminUser',
    mixins: [pageMixin],
    data() {
        return {
            params: {
                name: ''
            },
            dialogVisible: false,
            formDataId: 0,
            formData: defaultFormData(),
            roleOptions: []
        }
    },
    watch: {
        // 只允许输入数字
        'formData.phone': function(newVal, oldVal) {
            this.formData.phone = newVal.replace(/\D/g, '')
        }
    },
    methods: {
        // 添加用户
        handleAdd() {
            this._getRoles()
            this.dialogVisible = true
            this.formDataId = 0
            this.formData = defaultFormData()
        },
        // 编辑用户
        async handleEdit(info) {
            this._getRoles()
            this.dialogVisible = true
            this.formDataId = info.id
            const { data } = await getDetail(info.id)
            this.formData = data
        },
        // 添加 or 编辑用户提交
        async submitForm() {
            await this.$refs.elForm.validate()
            if (this.formDataId == 0) {
                await add(this.formData)
            } else {
                await edit(this.formDataId, this.formData)
            }
            this.dialogVisible = false
            this._getData()
            this.$message.success('成功')
        },
        // 获取所有角色
        async _getRoles() {
            if (this.roleOptions && this.roleOptions.length > 0) {
                return
            }
            const { data } = await getRoles()
            this.roleOptions = data.data
        },
        // 删除用户
        async handleDel(info) {
            await this.$confirm('删除用户不可恢复', '警告')
            const { message } = await del(info.id)
            this.$message.success(message)
            this._getData(this.params)
        },
        // 获取数据
        async _getData() {
            const res = await getList(this.params)
            this.list = res.data.data
            this.total = res.data.total
            this.pageSize = res.data.per_page
            this.page = res.data.current_page
            this.table_loading = false
        }
    }
}
</script>
