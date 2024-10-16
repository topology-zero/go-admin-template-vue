import { ref, onMounted } from 'vue'

export function usePage(_getDataFn, _params = {}, init = true) {
    onMounted(() => init && _getDataFn())

    // data
    const tableLoading = ref(false)
    const list = ref([])
    const params = ref({
        pageSize: 10, // 每页显示条目个数
        page: 1, // 当前页数
        ..._params
    })
    const pageSizes = ref([10, 25, 50, 100]) // 每页显示条目
    const total = ref(1) // 总共多少页

    // methods
    // 每页显示条目改变
    const handleSizeChange = (val) => {
        params.value.pageSize = val
        _getDataFn()
    }
    // 跳转页面
    const handleCurrentChange = (val) => {
        params.value.page = val
        _getDataFn()
    }
    // 搜索
    const search = () => {
        _getDataFn()
    }

    return {
        tableLoading,
        list,
        params,
        pageSizes,
        total,
        handleSizeChange,
        handleCurrentChange,
        search
    }
}
