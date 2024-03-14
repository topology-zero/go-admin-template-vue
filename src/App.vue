<template>
    <el-config-provider :locale="locale"
                        size="large">
        <div id="app">
            <router-view />
        </div>
    </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)

</script>
