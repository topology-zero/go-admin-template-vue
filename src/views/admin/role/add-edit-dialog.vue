<template>
    <el-dialog :title="formData.id == 0 ? '添加角色' : '编辑角色'"
               v-model="visible"
               width="30%">
        <el-form ref="elFormRef"
                 v-loading="loading"
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
                <el-tree ref="treeRef"
                         :data="authTreeData"
                         node-key="id"
                         default-expand-all
                         show-checkbox
                         :props="{label: 'name',children: 'child'}"
                         @check="setAuth" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary"
                       @click="submitForm()">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { add, edit } from './api'
import useDict from '@/store/dict'

const dictStore = useDict()
const { authTreeData } = dictStore

const emit = defineEmits(['update:visible', 'update:formData', 'update:loading', 'done'])
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    formData: {
        type: Object
    }
})

const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
})
const loading = computed({
    get: () => props.loading,
    set: (value) => emit('update:loading', value)
})
const formData = computed({
    get: () => props.formData,
    set: (value) => emit('update:formData', value)
})

const treeRef = ref()
const elFormRef = ref()

// 添加 or 编辑角色提交
const submitForm = async () => {
    formData.value.auth = treeRef.value.getCheckedKeys().concat(treeRef.value.getHalfCheckedKeys())
    await elFormRef.value.validate()
    loading.value = true
    if (formData.value.id == 0) {
        await add(formData.value)
    } else {
        await edit(formData.value.id, formData.value)
    }
    visible.value = false
    loading.value = false
    ElMessage.success('成功')
    emit('done')
}

const setAuth = async (data, { checkedKeys, halfCheckedKeys }) => {
    formData.value.auth = checkedKeys.concat(halfCheckedKeys)
    elFormRef.value.validate()
}

const setCheckedKeys = (keys) => {
    treeRef.value.setCheckedKeys(keys, false)
}

defineExpose({
    setCheckedKeys
})
</script>
