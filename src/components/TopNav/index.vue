<template>
    <el-menu :default-active="activeMenu"
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
        <el-submenu v-if="topMenus.length > visibleNumber"
                    index="more">
            <template slot="title">更多菜单</template>
            <template v-for="(item, index) in topMenus">
                <el-menu-item v-if="index >= visibleNumber"
                              :key="index"
                              :index="item.path">
                    <!-- <svg-icon :icon-class="item.icon" /> -->
                    {{ item.title }}
                </el-menu-item>
            </template>
        </el-submenu>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            // 顶部栏初始数
            visibleNumber: 5
        }
    },
    computed: {
        ...mapGetters(['userRouter']),
        // 顶部显示菜单
        topMenus() {
            const res = []
            this.userRouter.map(e => res.push({ path: e.path, title: e.title }))
            return res
        },
        // 默认激活的菜单
        activeMenu() {
            if (this.userRouter.length == 0) {
                return
            }
            const path = this.$route.path
            let activePath = this.userRouter[0].path
            if (path.lastIndexOf('/') > 0) {
                const tmpPath = path.substring(1, path.length)
                activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'))
            }
            this.activeRoutes(activePath)
            return activePath
        }
    },
    mounted() {
        this.setVisibleNumber()
    },
    methods: {
        // 根据宽度计算设置显示栏数
        setVisibleNumber() {
            const width = document.body.getBoundingClientRect().width - 200
            const elWidth = this.$el.getBoundingClientRect().width
            const menuItemNodes = this.$el.children
            const menuWidth = Array.from(menuItemNodes).map(
                (i) => i.getBoundingClientRect().width
            )
            this.visibleNumber = (
                parseInt(width - elWidth) / parseInt(menuWidth)
            ).toFixed(0)
        },
        // 当前激活的路由
        activeRoutes(key) {
            this.$store.commit('routerSet/SET_CURRENT_ROUTER', key)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item {
    float: left;
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
