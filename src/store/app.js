import { defineStore } from 'pinia'

export default defineStore('app', {
    state: () => ({
        showLogo: true,
        sidebar: {
            opened: true,
            withoutAnimation: false
        },
        fixedHeader: true,
        useTopNav: false
    }),
    actions: {
        toggleSideBar() {
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = false
        },
        closeSideBar(withoutAnimation) {
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        }
    },
    persist: {
        paths: ['showLogo', 'sidebar', 'fixedHeader']
    }
})
