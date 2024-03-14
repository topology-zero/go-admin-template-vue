<template>
    <el-menu :default-active="activeMenu"
             ref="elMenuRef"
             mode="horizontal"
             @select="activeRoutes">
        <template v-for="(item, index) in topMenus">
            <el-menu-item v-if="index < visibleNumber"
                          :key="index"
                          :index="item.path">
                <!-- <svg-icon :icon-class="item.icon" /> -->
                {{ item.title }}
            </el-menu-item>
        </template>

        <!-- 顶部菜单超出数量折叠 -->
        <el-sub-menu v-if="topMenus.length > visibleNumber"
                     index="more">
            <template #title>更多菜单</template>
            <template v-for="(item, index) in topMenus">
                <el-menu-item v-if="index >= visibleNumber"
                              :key="index"
                              :index="item.path">
                    <!-- <svg-icon :icon-class="item.icon" /> -->
                    {{ item.title }}
                </el-menu-item>
            </template>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import useUserStore from '@/store/user'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const route = useRoute()
const { permissionRoute, currentRouter } = storeToRefs(userStore)
const visibleNumber = ref(5)
const elMenuRef = ref()

onMounted(() => {
    const width = document.body.getBoundingClientRect().width - 200
    const elWidth = elMenuRef.value.$el.getBoundingClientRect().width
    const menuItemNodes = elMenuRef.value.$el.children
    const menuWidth = Array.from(menuItemNodes).map(e => e.getBoundingClientRect().width) || 0
    visibleNumber.value = (parseInt(width - elWidth) / parseInt(menuWidth)).toFixed(0)
})

const topMenus = computed(() => permissionRoute.value.filter(e => e.meta && !(e.hidden && e.hidden == true)).map(e => ({ path: e.path, title: e.meta.title })))

// 默认激活的菜单
const activeMenu = computed(() => {
    if (topMenus.value.length == 0) {
        return
    }
    const path = route.path
    let activePath = topMenus.value[0].path
    if (path.lastIndexOf('/') > 0) {
        const tmpPath = path.substring(1, path.length)
        activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'))
    }

    if (currentRouter.value.length == 0) {
        activeRoutes(activePath)
    }
    return activePath
})

// 当前激活的路由
const activeRoutes = (key) => {
    userStore.setTopNavActivePath(key)
}
</script>

<style lang="scss" scoped>
.el-menu {
    flex: 1;
    border-bottom: none !important;
}
.el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
    margin: 0;
    border-bottom: 3px solid transparent;
    color: #999093;
    padding: 0 5px;
    margin: 0 10px;
}

.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid #409eff;
    color: #303133;
}
</style>
