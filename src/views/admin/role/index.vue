<template>
    <div class="app-container">
        <p class="page-title">角色列表</p>
        <div class="filter-container">
            <el-button v-permission="`admin:role:add`"
                       type="primary"
                       plain
                       size="default"
                       class="filter-item"
                       @click="handleAdd()">
                添加角色
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
                             label="角色名"
                             prop="name" />
            <el-table-column align="center"
                             width="170px"
                             label="操作">
                <template #default="{row}">
                    <el-button v-if="row.id != 1"
                               v-permission="`admin:role:edit`"
                               size="small"
                               type="primary"
                               @click="handleEdit(row)">编辑
                    </el-button>
                    <el-button v-if="row.id != 1"
                               v-permission="`admin:role:del`"
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

        <add-edit-dialog v-model:visible="showDialog"
                         v-model:formData="formData"
                         v-model:loading="showLoading"
                         ref="addEditDialogRef"
                         @done="_getData" />
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { getList, del, getDetail } from './api'
import { usePage } from '@/utils/mixin/page'
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEditDialog from './add-edit-dialog.vue'

const defaultFormData = () => ({
    id: 0,
    name: '',
    auth: []
})

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

// data
const formData = ref(defaultFormData())
const showDialog = ref(false)
const showLoading = ref(false)
const addEditDialogRef = ref()

// 添加角色
const handleAdd = async () => {
    showLoading.value = true
    showDialog.value = true
    await nextTick()
    addEditDialogRef.value.setCheckedKeys([])
    formData.value = defaultFormData()
    showLoading.value = false
}

// 编辑角色
const handleEdit = async (info) => {
    showLoading.value = true
    showDialog.value = true
    const { data } = await getDetail(info.id)
    formData.value = data
    await nextTick()
    addEditDialogRef.value.setCheckedKeys(formData.value.auth)
    showLoading.value = false
}

// 删除角色
const handleDel = async (info) => {
    await ElMessageBox.confirm('删除角色不可恢复', '警告')
    const { message } = await del(info.id)
    ElMessage.success(message)
    _getData()
}

</script>
