<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo"
              :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu"
                     :collapse="isCollapse"
                     :background-color="variables.menuBg"
                     :text-color="variables.menuText"
                     :unique-opened="false"
                     :active-text-color="variables.menuActiveText"
                     :collapse-transition="false"
                     mode="vertical">
                <sidebar-item v-for="route in routes"
                              :key="route.path"
                              :item="route"
                              :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters([
            'sidebar',
            'authKey'
        ]),
        routes() {
            // 需要将对象深拷贝,否则会出现问题
            const routes = JSON.parse(JSON.stringify(this.$router.options.routes))
            if (this.authKey.length == 1 && this.authKey[0] == '*') {
                return routes
            }
            this.resetRoute(routes)
            return routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    },
    methods: {
        resetRoute(data) {
            data.map((val, i) => {
                if (val.permission && !this.authKey.includes(val.permission)) {
                    data[i].hidden = true
                }
                if (val.children) {
                    this.resetRoute(data[i].children)
                }
            })
        }
    }
}
</script>
