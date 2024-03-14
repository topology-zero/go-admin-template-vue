import { ref, onMounted } from 'vue'
import useAppStore from '@/store/app'

export function useFixBugIniOS() {
    const subMenu = ref()
    const appStore = useAppStore()
    const { device } = appStore

    onMounted(() => {
        fixBugIniOS()
    })

    const fixBugIniOS = () => {
        const $subMenu = subMenu.value
        if ($subMenu) {
            const handleMouseleave = $subMenu.handleMouseleave
            $subMenu.handleMouseleave = (e) => {
                if (device === 'mobile') {
                    return
                }
                handleMouseleave(e)
            }
        }
    }
}
