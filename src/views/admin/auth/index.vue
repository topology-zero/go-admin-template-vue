<template>
    <div class="app-container auths">
        <p class="page-title">权限管理</p>
        <div class="filter-container">
            <el-button v-permission="`admin:auth:add`"
                       type="primary"
                       plain
                       class="filter-item"
                       size="default"
                       @click="addTopAuth()">
                添加顶级权限
            </el-button>
        </div>
        <el-table :data="treeData"
                  node-key="id"
                  default-expand-all
                  :tree-props="{label: 'name'}"
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
                <template #default="{row}">
                    <el-tag v-if="row.isMenu == 0"
                            type="warning">否</el-tag>
                    <el-tag v-else
                            type="success">是</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="请求方法"
                             width="150">
                <template #default="{row}">
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
                             min-width="100"
                             label="请求接口" />
            <el-table-column align="center"
                             label="操作"
                             width="260">
                <template #default="{row}">
                    <el-button v-permission="`admin:auth:add`"
                               type="success"
                               size="small"
                               @click="addAuth(row)">
                        新增子权限
                    </el-button>
                    <el-button v-permission="`admin:auth:edit`"
                               type="primary"
                               size="small"
                               @click="editAuth(row)">
                        编辑
                    </el-button>
                    <el-button v-permission="`admin:auth:del`"
                               type="danger"
                               size="small"
                               @click="delAuth(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <add-edit-dialog v-model:visible="showDialog"
                         v-model:formData="formData"
                         @done="_getData" />

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getList, del } from './api'
import AddEditDialog from './add-edit-dialog.vue'

const defaultFormData = () => ({
    id: 0,
    pid: 0,
    name: '',
    key: '',
    isMenu: 0,
    action: '',
    api: ''
})

// data
const needloading = ref(true)
const showDialog = ref(false)
const formData = ref({})
const treeData = ref([])

// 获取数据
const _getData = async () => {
    const { data } = await getList()
    treeData.value = data
    needloading.value = false
}

onMounted(async () => {
    await _getData()
})

const addTopAuth = () => {
    showDialog.value = true
    formData.value = defaultFormData()
    formData.value.isMenu = 1
}

// 添加权限
const addAuth = (data) => {
    showDialog.value = true
    formData.value = defaultFormData()
    formData.value.pid = data.id
}

// 编辑权限
const editAuth = (data) => {
    showDialog.value = true
    Object.assign(formData.value, data)
}

// 删除权限
const delAuth = async (data) => {
    await ElMessageBox.confirm('删除权限将不可恢复', '警告')
    const { message } = await del(data.id)
    ElMessage.success(message)
    _getData()
}
</script>
<style lang="scss" scoped>
.auths {
    .el-radio {
        margin-right: 5px;
    }

    .option {
        margin-left: 50px;
    }

    :deep(.el-table td) {
        padding: 2px !important;
    }

    .el-table {
        font-size: 10px;
    }
}
</style>
