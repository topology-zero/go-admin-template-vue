<template>
    <div class="sidebar-logo-container"
         :class="{ 'collapse': !sidebar.opened }">
        <transition name="sidebarLogoFade">
            <router-link v-if="!sidebar.opened"
                         key="collapse"
                         class="sidebar-logo-link"
                         to="/">
                <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
                     class="sidebar-logo">
            </router-link>
            <router-link v-else
                         key="expand"
                         class="sidebar-logo-link"
                         to="/">
                <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
                     class="sidebar-logo">
                <h1 class="sidebar-title">欧米伽</h1>
            </router-link>
        </transition>
    </div>
</template>

<script setup>
import useAppStore from '@/store/app'

const appStore = useAppStore()
const { sidebar } = appStore
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
    opacity: 0;
}
.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>
