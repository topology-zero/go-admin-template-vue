<template>
    <el-breadcrumb class="app-breadcrumb"
                   separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList"
                                :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                      class="no-redirect">{{ item.meta.title }}</span>
                <a v-else
                   @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref(null)
const firstPath = '/dashboard'

onMounted(() => getBreadcrumb())

const getBreadcrumb = () => {
    // only show routes with meta.title
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    if (first && first.path != firstPath) {
        matched = [{ path: firstPath, meta: { title: '首页' } }].concat(matched)
    }

    levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

watch(() => route.path, () => getBreadcrumb())

const pathCompile = (path) => {
    const { params } = route
    const toPath = compile(path)
    return toPath(params)
}

const handleLink = (item) => {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect)
        return
    }
    router.push(pathCompile(path))
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
