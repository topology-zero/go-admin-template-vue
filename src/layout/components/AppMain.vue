<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform"
                        appear
                        mode="out-in">
                <keep-alive :include="cachedViews">
                    <component :is="Component"
                               :key="key" />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import useTagsView from '@/store/tagsView'
import { useRoute } from 'vue-router'

const tagsStore = useTagsView()
const { cachedViews } = tagsStore
const route = useRoute()

const key = computed(() => route.path)
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 84px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 84px;
}
</style>
