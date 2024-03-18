import { defineStore } from 'pinia'

export default defineStore('app', {
    state: () => ({
        showLogo: true,
        sidebar: {
            opened: true,
            withoutAnimation: false
        },
        device: 'desktop',
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
        },
        toggleDevice(device) {
            this.device = device
        }
    },
    persist: {
        paths: ['showLogo', 'sidebar', 'fixedHeader']
    }
})
