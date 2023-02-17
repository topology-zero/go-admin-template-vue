<template>
    <div class="app-container">
        <p class="page-title">角色列表</p>
        <div class="filter-container">
            <el-button v-permission="`admin:role:add`"
                       type="primary"
                       plain
                       size="mini"
                       class="filter-item"
                       @click="handleAdd()">
                添加角色
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
                             label="角色名"
                             prop="name" />
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.id != 1"
                               v-permission="`admin:role:edit`"
                               size="mini"
                               type="primary"
                               @click="handleEdit(scope.row)">编辑
                    </el-button>
                    <el-button v-if="scope.row.id != 1"
                               v-permission="`admin:role:del`"
                               size="mini"
                               type="danger"
                               @click="handleDel(scope.row)">
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
        <el-dialog :title="formDataId == 0 ? '添加角色' : '编辑角色'"
                   :visible.sync="dialogVisible"
                   width="30%">
            <el-form ref="elForm"
                     v-loading="needloading"
                     :model="formData"
                     label-width="100px"
                     element-loading-background="rgba(255, 255, 255, 0.99)">
                <el-form-item label="角色名"
                              :rules="{ required: true, trigger: 'change', message: '请输入角色名' }"
                              prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="权限"
                              :rules="{ type: 'array', required: true, min: 1, message: '请选择权限' }"
                              prop="auth">
                    <el-tree ref="tree"
                             :data="treeData"
                             node-key="id"
                             default-expand-all
                             show-checkbox
                             :props="{label: 'name',children: 'child'}"
                             @check="setAuth" />
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
        name: '',
        auth: []
    }
}
import { getAuths } from '@/api/common'
import { getList, add, edit, del, getDetail } from './api'
import { pageMixin } from '@/utils/mixin'
export default {
    name: 'AdminRole',
    mixins: [pageMixin],
    data() {
        return {
            params: {
                name: ''
            },
            formDataId: 0,
            formData: defaultFormData(),
            treeData: [],
            dialogVisible: false,
            needloading: false
        }
    },
    methods: {
        // 添加角色
        async handleAdd() {
            this.dialogVisible = true
            this.formDataId = 0
            this.formData = defaultFormData()
            this._getAuths()
            await this.$nextTick()
            this.$refs.tree.setCheckedKeys([])
        },
        // 编辑角色
        async handleEdit(info) {
            this.dialogVisible = true
            this.needloading = true
            this._getAuths()
            this.formDataId = info.id
            const { data } = await getDetail(info.id)
            this.formData = data
            await this.$nextTick()
            this.$refs.tree.setCheckedKeys(this.formData.auth, false)
            this.needloading = false
        },
        // 添加 or 编辑角色提交
        async submitForm() {
            this.formData.auth = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            await this.$refs.elForm.validate()
            this.needloading = true
            if (this.formDataId == 0) {
                await add(this.formData)
            } else {
                await edit(this.formDataId, this.formData)
            }
            this.dialogVisible = false
            this.needloading = false
            this._getData()
            this.$message.success('成功')
        },

        // 删除角色
        async handleDel(info) {
            await this.$confirm('删除角色不可恢复', '警告')
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
        },
        // 获取所有权限
        async _getAuths() {
            if (this.treeData && this.treeData.length > 0) {
                return
            }
            this.needloading = true
            const { data } = await getAuths()
            this.treeData = data.tree
            this.needloading = false
        },
        setAuth(data, { checkedKeys, halfCheckedKeys }) {
            this.formData.auth = checkedKeys.concat(halfCheckedKeys)
            this.$refs.elForm.validate()
        }
    }
}
</script>
