<template>
    <div class="app-container">
        <p class="page-title">用户列表</p>
        <div class="filter-container">
            <el-button v-permission="`admin:user:add`"
                       type="primary"
                       size="default"
                       plain
                       @click="handleAdd()">
                添加用户
            </el-button>
        </div>

        <el-table v-loading="tableLoading"
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
                <template #default="{row}">
                    <el-tag v-if="row.status == 1"
                            type="success">正常</el-tag>
                    <el-tag v-else
                            type="danger">停封</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template #default="{row}">
                    <el-button v-permission="`admin:user:edit`"
                               size="small"
                               type="primary"
                               @click="handleEdit(row)">编辑
                    </el-button>
                    <el-button v-if="row.id != 1"
                               v-permission="`admin:user:del`"
                               size="small"
                               type="danger"
                               @click="handleDel(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background
                           :current-page="params.page"
                           :page-sizes="pageSizes"
                           :page-size="params.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
        </div>

        <add-edit-dialog v-model:visible="dialogVisible"
                         v-model:formData="formData"
                         @done="_getData" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getList, del, getDetail } from './api'
import { usePage } from '@/utils/mixin/page'
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEditDialog from './add-edit-dialog.vue'

const defaultFormData = () => ({
    id: 0,
    username: '',
    password: '',
    realname: '',
    roleId: '',
    status: 1,
    phone: ''
})

// data
const dialogVisible = ref(false)
const formData = ref(defaultFormData())

// mixin
// 获取数据
const _getData = async () => {
    const { data } = await getList(params.value)
    list.value = data.data
    total.value = data.total
    tableLoading.value = false
}
const {
    tableLoading,
    list,
    params,
    pageSizes,
    total,
    handleSizeChange,
    handleCurrentChange
} = usePage(_getData)

// 添加用户
const handleAdd = () => {
    dialogVisible.value = true
    formData.value = defaultFormData()
}

// 编辑用户
const handleEdit = async (info) => {
    dialogVisible.value = true
    const { data } = await getDetail(info.id)
    formData.value = data
}

// 删除用户
const handleDel = async (info) => {
    await ElMessageBox.confirm('删除用户不可恢复', '警告')
    const { message } = await del(info.id)
    ElMessage.success(message)
    _getData(params)
}
</script>
