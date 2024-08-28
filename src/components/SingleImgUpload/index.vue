<template>
    <el-upload :action="uploadUrl"
               :headers="{'Authorization': token}"
               list-type="picture-card"
               :show-file-list="false"
               :on-success="uploadSuccess">
        <div class="el-upload-list--picture-card"
             v-if="modelValue">
            <div class="el-upload-list__item">
                <img class="el-upload-list__item-thumbnail"
                     :src="modelValue">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview"
                          @click.stop="uploadRemove()">
                        <svg-icon icon-class="delete"
                                  style="font-size: 1.5rem; fill: #ddd;" />
                    </span>
                </span>
            </div>
        </div>
        <el-icon v-else>
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import useUserStore from '@/store/user'
import { Plus } from '@element-plus/icons-vue'

const uStore = useUserStore()
const { token } = uStore
const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/upload/image'

const modelValue = defineModel({ type: String })

// 上传
const uploadSuccess = ({ data }) => {
    modelValue.value = data
}

// 删除
const uploadRemove = () => {
    modelValue.value = ''
}
</script>

<style lang="scss" scoped>
.el-upload-list__item {
    margin: 0;
}
</style>
