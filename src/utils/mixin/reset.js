import { ref } from 'vue'

// 重置
export function useReset() {
    const queryFormRef = ref()
    const handleReset = () => {
        queryFormRef.value?.resetFields()
    }
    return {
        queryFormRef,
        handleReset
    }
}

