<template>
    <div :class="classObj"
         class="app-wrapper">
        <side class="sidebar-container" />
        <div class="has-tags-view main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar />
                <tags-view />
            </div>
            <app-main />
        </div>
    </div>
</template>

<script setup>
import Side from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'
import { computed } from 'vue'
import useAppStore from '@/store/app'

const appStore = useAppStore()
const { sidebar, fixedHeader } = appStore

const classObj = computed(() => {
    return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation
    }
})
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}
</style>
