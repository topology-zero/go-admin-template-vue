<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu"
                     :collapse="!sidebar.opened"
                     background-color="#304156"
                     text-color="#bfcbd9"
                     active-text-color="#409EFF"
                     :collapse-transition="false"
                     mode="vertical">
                <sidebar-item v-for="v in routesJson"
                              :key="v.path"
                              :item="v"
                              :base-path="v.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const { showLogo, sidebar, useTopNav } = storeToRefs(appStore)
const { permissionRoute, currentRouter } = storeToRefs(userStore)

const routesJson = computed(() => useTopNav.value ? currentRouter.value : permissionRoute.value)

const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path
})
</script>
