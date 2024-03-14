<template>
    <template v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
            <app-link v-if="onlyOneChild.meta"
                      :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <icon :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
                    <template #title>
                        <span>{{ onlyOneChild.meta.title }}</span>
                    </template>
                </el-menu-item>
            </app-link>
        </template>
        <el-sub-menu v-else
                     ref="subMenu"
                     :index="resolvePath(item.path)">
            <template #title>
                <icon v-if="item.meta"
                      :icon="item.meta && item.meta.icon" />
                <span>{{ item.meta.title }}</span>
            </template>
            <sidebar-item v-for="child in item.children"
                          :key="child.path"
                          :item="child"
                          :base-path="resolvePath(child.path)" />
        </el-sub-menu>
    </template>
</template>

<script setup>
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import Icon from './Icon.vue'
import AppLink from './Link.vue'
import { useFixBugIniOS } from './FixiOSBug'
import { ref } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
})

// mixin
useFixBugIniOS()

// data
const onlyOneChild = ref({})

// method
const hasOneShowingChild = (children = [], parent) => {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            // Temp set(will be used if only has one showing child)
            onlyOneChild.value = item
            return true
        }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
        return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
    }

    return false
}

const resolvePath = (routePath) => {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}
</script>
