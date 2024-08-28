<template>
    <el-dialog v-model="visible"
               :title="formData.id == 0 ? '添加权限' : '编辑权限'">
        <el-form ref="elFormRef"
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
                <el-radio-group v-model.number="formData.isMenu"
                                size="default">
                    <el-radio border
                              :label="0">否</el-radio>
                    <el-radio border
                              :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="formData.isMenu == 0"
                          label="请求方法"
                          :rules="{ required: true, trigger: 'blur', message: '请输入请求方法' }"
                          prop="action">
                <el-radio-group v-model="formData.action"
                                size="default">
                    <el-radio border
                              label="get" />
                    <el-radio border
                              label="post" />
                    <el-radio border
                              label="put" />
                    <el-radio border
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
        <template #footer>
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm()">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { add, edit } from './api'

const emit = defineEmits(['done'])
const visible = defineModel('visible', { type: Boolean })
const formData = defineModel('formData', { type: Object })

// 提交表单
const elFormRef = ref()
const submitForm = async () => {
    await elFormRef.value.validate()
    if (formData.value.isMenu == 1) {
        formData.value.action = ''
        formData.value.api = ''
    }
    if (formData.value.id == 0) {
        await add(formData.value)
    } else {
        await edit(formData.value.id, formData.value)
    }
    ElMessage.success('成功')
    visible.value = false
    emit('done')
}
</script>
