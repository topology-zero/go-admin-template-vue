<template>
    <div id="tags-view-container"
         ref="rootRef"
         class="tags-view-container">
        <scroll-pane ref="scrollPaneRef"
                     class="tags-view-wrapper"
                     @scroll="handleScroll">
            <router-link v-for="tag in visitedViews"
                         ref="tagRef"
                         :key="tag.path"
                         :class="isActive(tag) ? 'active' : ''"
                         :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                         class="tags-view-item"
                         @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                         @contextmenu.prevent="openMenu(tag, $event)">
                <div style="margin: 0 5px;">{{ tag.title }}</div>
                <svg-icon icon-class="close"
                          v-if="!isAffix(tag)"
                          class="el-icon-close"
                          @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <ul v-show="visible"
            :style="{ left: left + 'px', top: top + 'px' }"
            class="contextmenu">
            <li @click="refreshSelectedTag">刷新</li>
            <li v-if="!isAffix(selectedTag)"
                @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags">关闭所有</li>
        </ul>
    </div>
</template>

<script setup>
import ScrollPane from './ScrollPane.vue'
import { ref, onMounted, watch, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useTagsView from '@/store/tagsView'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import path from 'path-browserify'

// route
const route = useRoute()
const router = useRouter()

// store
const tagStore = useTagsView()
const userStore = useUserStore()
const { visitedViews } = storeToRefs(tagStore)
const { permissionRoute } = userStore

// refs
const scrollPaneRef = ref()
const tagRef = ref([])
const rootRef = ref()

// data
const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref({})
const affixTags = ref([])

// 提供给子组件使用
provide('parentProvide', tagRef)

watch(() => route.path, () => {
    addTags()
    moveToCurrentTag()
})

watch(visible, (value) => {
    if (value) {
        document.body.addEventListener('click', closeMenu)
    } else {
        document.body.removeEventListener('click', closeMenu)
    }
})

onMounted(() => {
    initTags()
    addTags()
})

const isActive = (tag) => {
    return tag.path === route.path
}

const isAffix = (tag) => {
    return tag.meta && tag.meta.affix
}

const addTags = () => {
    const { name } = route
    if (name) {
        tagStore.addView(route)
    }
    return false
}

const initTags = () => {
    tagStore.$reset()
    const tags = affixTags.value = filterAffixTags(permissionRoute)
    for (const tag of tags) {
        if (tag.name) {
            tagStore.addView(tag)
        }
    }
}

const filterAffixTags = (routers, basePath = '/') => {
    const tags = []
    routers.forEach(r => {
        if (r.meta && r.meta.affix && !r.hidden) {
            const tagPath = path.resolve(basePath, r.path)
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: r.name,
                meta: { ...r.meta }
            })

            if (r.children && r.children.length > 0) {
                tags.concat(...filterAffixTags(r.children))
            }
        }
    })
    return tags
}

const moveToCurrentTag = () => {
    const tags = tagRef.value
    for (const tag of tags) {
        if (tag.to.path === route.path) {
            scrollPaneRef.value.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== route.fullPath) {
                tagStore.updateVisitedView(route)
            }
            break
        }
    }
}

const refreshSelectedTag = () => {
    tagStore.delCachedView(selectedTag.value)
    const { fullPath } = selectedTag.value
    router.replace({
        path: '/redirect' + fullPath
    })
}

const closeSelectedTag = (tag) => {
    tagStore.delView(tag)
    if (isActive(tag)) {
        toLastView(visitedViews.value, tag)
    }
}

const closeOthersTags = () => {
    router.push(selectedTag.value)
    tagStore.delOthersViews(selectedTag.value)
    moveToCurrentTag()
}

const closeAllTags = () => {
    tagStore.delAllViews()
    if (affixTags.value.some(tag => tag.path === selectedTag.value.path)) {
        return
    }
    toLastView(visitedViews.value, selectedTag.value)
}

const toLastView = (visitedViewsLocal, view) => {
    const latestView = visitedViewsLocal.slice(-1)[0]
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
            // to reload home page
            router.replace({ path: '/redirect' + view.fullPath })
        } else {
            router.push('/')
        }
    }
}

const openMenu = (tag, e) => {
    const menuMinWidth = 105
    const offsetLeft = rootRef.value.getBoundingClientRect().left // container margin left
    const offsetWidth = rootRef.value.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const leftVal = e.clientX - offsetLeft + 15 // 15: margin right

    if (leftVal > maxLeft) {
        left.value = maxLeft
    } else {
        left.value = leftVal
    }

    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
}

const closeMenu = () => {
    visible.value = false
}

const handleScroll = () => {
    closeMenu()
}
</script>

<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
        .tags-view-item {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            height: 26px;
            font-size: 12px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            margin-left: 5px;
            margin-top: 4px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;

                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;

            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }

            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
