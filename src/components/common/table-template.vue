<template>
    <el-table>
        <el-table-column align="center"
                         label="状态">
            <template slot-scope="{row}">
                <el-tag v-if="row.status == 1"
                        type="success">正常</el-tag>
                <el-tag v-else
                        type="danger">停封</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {

}
</script>
