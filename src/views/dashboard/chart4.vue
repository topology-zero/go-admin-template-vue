<template>
    <div style="width: 100%; height: 100%; position: relative"
         class="chart4">
        <my-title title="决策支持"
                  class="my-title" />
        <v-chart :option="chartOption"
                 autoresize />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, PieChart, GridComponent, LabelLayout])

// data
const chartOption = ref({
    grid: { // padding
        containLabel: true
    },
    series: [
        {
            type: 'pie',
            radius: [20, 100],
            animationDuration: 3000,
            roseType: 'radius',
            animationType: 'expansion',
            animationDurationUpdate: 3000,
            animationTypeUpdate: 'expansion',
            label: {
                show: true,
                color: 'inherit',
                fontSize: 12,
                formatter: ({ name, value }) => {
                    return `${name}`
                }
            },
            labelLine: {
                length: 10,
                length2: 20
            },
            itemStyle: {
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#fff'
            },
            data: [
                { name: 'gold', value: 2 },
                { name: 'wood', value: 3.5 },
                { name: 'water', value: 5 },
                { name: 'fire', value: 5 },
                { name: 'soil', value: 6.8 },
                { name: 'nitrogen', value: 7 },
                { name: 'helium', value: 8.2 },
                { name: 'gallium', value: 10 }
            ]
        }
    ]
})
</script>

<style lang="scss" scoped>
.my-title {
    transform: rotate(90deg) translateX(-50%);
    position: absolute;
    top: 50%;
    left: 40px;
}
</style>
