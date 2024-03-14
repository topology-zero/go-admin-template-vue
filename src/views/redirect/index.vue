<template>
    <div />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// route
const route = useRoute()
const router = useRouter()

onMounted(() => {
    const { params, query } = route
    const { path } = params
    router.replace({ path: '/' + path, query })
})
</script>
