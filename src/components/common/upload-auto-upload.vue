<template>
    <el-form-item label="图片"
                  :rules="{ required: true, trigger: 'blur', message: '请选择文件' }"
                  prop="file">
        <el-upload ref="upload"
                   :on-remove="handleUploadRemove"
                   :on-success="handleUploadSuccess"
                   :limit="1"
                   :action="action"
                   :file-list="fileList">
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
            action: 'http://foo.bar.com',
            fileList: [],
            formData: {}
        }
    },
    methods: {
        handleUploadRemove(file, fileList) {
            this.formData.file = null
        },
        handleUploadSuccess(response, file, fileList) {
            this.formData.file = response.data.imageUrl
        }
    }
}
</script>
