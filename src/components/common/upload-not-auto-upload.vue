<template>
    <el-form-item label="Excel文件"
                  :rules="{ required: true, trigger: 'blur', message: '请选择文件' }"
                  prop="file">
        <el-upload ref="upload"
                   :on-remove="handleUploadRemove"
                   :on-change="handleChangeFile"
                   :limit="1"
                   action=""
                   :file-list="fileList"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                   :auto-upload="false">
            <el-button slot="trigger"
                       size="small"
                       type="primary">选取文件</el-button>
        </el-upload>
    </el-form-item>
</template>
<script>
export default {
    data() {
        return {
            fileList: [],
            importFormData: {}
        }
    },
    methods: {
        handleUploadRemove(file, fileList) {
            this.importFormData.file = null
        },
        handleChangeFile(file, fileList) {
            this.importFormData.file = file.raw
        }
    }
}
</script>
