<template>
    <el-dialog :title="formData.id == 0 ? '添加用户' : '编辑用户'"
               v-model="visible"
               width="30%">
        <el-form ref="elFormRef"
                 :model="formData"
                 label-width="100px">
            <el-form-item label="用户名"
                          :rules="{ required: true, trigger: 'blur', message: '请输入用户名' }"
                          prop="username">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码"
                          :rules="{ required: formData.id == 0, trigger: 'blur', message: '请输入密码' }"
                          prop="password">
                <el-input v-model="formData.password"
                          :placeholder="formData.id == 0 ? '': '不输入则不修改'"
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
        <template #footer>
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary"
                       @click="submitForm()">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { add, edit } from './api'
import useDict from '@/store/dict'

const dictStore = useDict()
const { roleOptions } = dictStore

const emit = defineEmits(['update:visible', 'update:formData', 'done'])
const props = defineProps({
    visible: {
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
const formData = computed({
    get: () => props.formData,
    set: (value) => emit('update:formData', value)
})

// watch
watch(
    () => formData.value.phone,
    (newVal) => { formData.value.phone = newVal.replace(/\D/g, '') }
)

// 添加 or 编辑用户提交
const elFormRef = ref()
const submitForm = async () => {
    await elFormRef.value.validate()
    if (formData.value.id == 0) {
        await add(formData.value)
    } else {
        await edit(formData.value.id, formData.value)
    }
    visible.value = false
    emit('done')
    ElMessage.success('成功')
}
</script>

