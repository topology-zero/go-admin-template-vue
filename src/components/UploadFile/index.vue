<template>
    <el-upload ref="uploadRef"
               style="width: 100%;"
               :limit="1"
               :on-exceed="handleUploadExceed"
               :on-change="handleUploadChange"
               :on-remove="handleUploadRemove"
               :auto-upload="false">
        <template #trigger>
            <el-button type="primary">选择文件</el-button>
        </template>
    </el-upload>
</template>

<script setup>
import { ref } from 'vue'
const model = defineModel()

const uploadRef = ref()
// 文件替换
const handleUploadExceed = (files) => {
    uploadRef.value.clearFiles()
    uploadRef.value.handleStart(files[0])
}

// 文件上传
const handleUploadChange = (file) => {
    model.value = file.raw
}

// 文件删除
const handleUploadRemove = () => {
    model.value = ''
}
</script>
