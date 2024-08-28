<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc"
                 :editor="editorRef"
                 :defaultConfig="toolbarConfig"
                 :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;"
                v-model="modelValue"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import useUserStore from '@/store/user'

const uStore = useUserStore()
const { token } = uStore

const modelValue = defineModel({ type: String })

const editorRef = shallowRef()
const mode = ref('default') // default | simple
const toolbarConfig = ref({})
const editorConfig = ref({
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            server: import.meta.env.VITE_APP_BASE_API + '/upload/image',
            fieldName: 'file',
            maxNumberOfFiles: 1,
            headers: {
                'Authorization': token
            },
            customInsert({ data }, insertFn) {
                insertFn(data, '', '')
            }
        }
    }
})

onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
