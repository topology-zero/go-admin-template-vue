<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
        </el-row>

        <el-row :gutter="20"
                style="margin-top:20px">
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="6">
                <el-skeleton :rows="3"
                             animated
                             class="selection" />
            </el-col>
        </el-row>

        <el-row :gutter="20"
                style="margin-top:20px">
            <el-col :span="12">
                <el-skeleton :rows="5"
                             animated
                             class="selection" />
            </el-col>
            <el-col :span="12">
                <el-skeleton :rows="5"
                             animated
                             class="selection" />
            </el-col>
        </el-row>

        <el-row style="margin-top:20px">
            <el-col :span="24">
                <el-skeleton :rows="5"
                             animated
                             class="selection" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters(['userInfo', 'authKey'])
    }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
    margin: 30px;

    .selection {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
    }
}
</style>
