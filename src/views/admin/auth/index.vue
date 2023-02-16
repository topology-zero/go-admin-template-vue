<template>
    <div class="app-container auths">
        <p class="page-title">权限管理</p>
        <div class="filter-container">
            <el-button v-permission="`admin:auth:add`"
                       type="primary"
                       plain
                       class="filter-item"
                       size="mini"
                       @click="addTop()">
                添加顶级权限
            </el-button>
        </div>
        <el-table :data="treeData"
                  node-key="id"
                  default-expand-all
                  :tree-props="treeConfig"
                  row-key="id"
                  border>
            <el-table-column align="left"
                             prop="name"
                             label="节点名"
                             min-width="200" />
            <el-table-column align="left"
                             prop="key"
                             label="权限标识"
                             width="180" />
            <el-table-column align="center"
                             label="是否菜单栏"
                             width="150">
                <template slot-scope="{row}">
                    <el-tag v-if="row.isMenu == 0"
                            type="warning">否</el-tag>
                    <el-tag v-else
                            type="success">是</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="请求方法"
                             width="150">
                <template slot-scope="{row}">
                    <el-tag v-if="row.action == 'get'">{{ row.action }}</el-tag>
                    <el-tag v-if="row.action == 'post'"
                            type="success">{{ row.action }}</el-tag>
                    <el-tag v-if="row.action == 'put'"
                            type="info">{{ row.action }}</el-tag>
                    <el-tag v-if="row.action == 'delete'"
                            type="danger">{{ row.action }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="left"
                             prop="api"
                             label="请求接口" />
            <el-table-column align="center"
                             label="操作"
                             width="260">
                <template slot-scope="{row}">
                    <el-button v-permission="`admin:auth:add`"
                               type="success"
                               size="mini"
                               @click="add(row)">
                        新增子权限
                    </el-button>
                    <el-button v-permission="`admin:auth:edit`"
                               type="primary"
                               size="mini"
                               @click="edit(row)">
                        编辑
                    </el-button>
                    <el-button v-permission="`admin:auth:del`"
                               type="danger"
                               size="mini"
                               @click="del(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="showDialog"
                   :title="formDataId == 0 ? '添加权限' : '编辑权限'">
            <el-form ref="elForm"
                     :model="formData"
                     label-width="100px">
                <el-form-item label="节点名"
                              :rules="{ required: true, trigger: 'blur', message: '请输入节点名' }"
                              prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="权限标识"
                              :rules="{ required: true, trigger: 'blur', message: '请输入权限标识' }"
                              prop="key">
                    <el-input v-model="formData.key" />
                </el-form-item>
                <el-form-item label="是否菜单栏"
                              :rules="{ required: true, trigger: 'blur', type: 'enum', enum: [0, 1], message: '请选择是否菜单栏' }"
                              prop="isMenu">
                    <el-radio-group v-model.number="formData.isMenu">
                        <el-radio border
                                  size="mini"
                                  :label="0">否</el-radio>
                        <el-radio border
                                  size="mini"
                                  :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.isMenu == 0"
                              label="请求方法"
                              :rules="{ required: true, trigger: 'blur', message: '请输入请求方法' }"
                              prop="action">
                    <el-radio-group v-model="formData.action">
                        <el-radio border
                                  size="mini"
                                  label="get" />
                        <el-radio border
                                  size="mini"
                                  label="post" />
                        <el-radio border
                                  size="mini"
                                  label="put" />
                        <el-radio border
                                  size="mini"
                                  label="delete" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.isMenu == 0"
                              label="请求接口"
                              :rules="{ required: true, trigger: 'blur', message: '请输入请求接口' }"
                              prop="api">
                    <el-input v-model="formData.api" />
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
const defaultFormData = () => {
    return {
        pid: '',
        name: '',
        key: '',
        isMenu: '',
        action: '',
        api: ''
    }
}
import { getList, add, edit, del } from './api'
export default {
    name: 'AdminAuth',
    data() {
        return {
            needloading: true,
            showDialog: false,
            formDataId: 0,
            formData: defaultFormData(),
            treeData: [],
            treeConfig: {
                label: 'name',
                children: 'child'
            }
        }
    },
    created() {
        this.getAuth()
    },

    methods: {
        // 初始化，获取所有权限
        async getAuth() {
            const { data } = await getList()
            this.treeData = data.tree
            this.needloading = false
        },
        // 提交表单
        async submitForm() {
            await this.$refs.elForm.validate()
            try {
                if (this.formData.isMenu == 1) {
                    this.formData.action = ''
                    this.formData.api = ''
                }
                if (this.dialogTitle == '添加权限') {
                    await add(this.formData)
                } else {
                    await edit(this.formData.id, this.formData)
                }
                this.$message.success('成功')
                this.getAuth()
            } finally {
                this.showDialog = false
            }
        },
        addTop() {
            this.formDataId = 0
            this.formData = defaultFormData()
            this.showDialog = true
            this.formData.pid = 0
            this.formData.isMenu = 1
        },
        // 添加权限
        add(data) {
            this.formDataId = 0
            this.formData = defaultFormData()
            this.showDialog = true
            this.formData.pid = data.id
            this.formData.isMenu = 0
        },
        // 编辑权限
        edit(data) {
            this.formData = defaultFormData()
            this.showDialog = true
            this.formDataId = data.id
            this.formData.pid = data.pid
            this.formData.name = data.name
            this.formData.key = data.key
            this.formData.isMenu = data.isMenu
            this.formData.action = data.action
            this.formData.api = data.api
        },
        // 删除权限
        async del(data) {
            await this.$confirm('删除权限将不可恢复', '警告')
            const { message } = await del(data.id)
            this.$message.success(message)
            this.getAuth()
        }
    }
}
</script>
<style lang="scss" scoped>
.auths {
    .el-radio {
        margin-right: 0px;
    }

    .option {
        margin-left: 50px;
    }

    ::v-deep .el-table td {
        padding: 2px !important;
    }

    .el-table {
        font-size: 10px;
    }
}
</style>
