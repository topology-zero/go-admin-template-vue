<template>
    <div class="dashboard-container">
        <el-row style="height: 33.3333333333%">
            <el-col :span="12"
                    style="height: 100%;">
                <chart1 />
            </el-col>
            <el-col :span="12"
                    style="height: 100%;">
                <chart2 />
            </el-col>
        </el-row>
        <el-row style="height: 33.3333333333%">
            <el-col :span="8"
                    style="height: 100%;">
                <chart3 />
            </el-col>
            <el-col :span="8"
                    style="height: 100%;">
                <chart5 />
            </el-col>
            <el-col :span="8"
                    style="height: 100%;">
                <chart4 />
            </el-col>
        </el-row>
        <el-row style="height: 33.3333333333%">
            <el-col :span="12"
                    style="height: 100%;">
                <chart6 />
            </el-col>
            <el-col :span="12"
                    style="height: 100%;">
                <chart7 />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import Chart1 from './chart1.vue'
import Chart2 from './chart2.vue'
import Chart3 from './chart3.vue'
import Chart4 from './chart4.vue'
import Chart5 from './chart5.vue'
import Chart6 from './chart6.vue'
import Chart7 from './chart7.vue'
</script>

<style lang="scss" scoped>
.dashboard-container {
    // background-color: #66b1ff;
    height: calc(100vh - 84px);
}
</style>
