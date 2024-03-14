<template>
    <el-icon>
        <svg-icon :icon-class="icon" />
    </el-icon>
</template>

<script setup>
defineProps({
    icon: String
})
</script>
