<template>
    <div style="width: 100%; height: 100%; position: relative;">
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
            radius: [50, 100],
            animationDuration: 3000,
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
                borderWidth: 3,
                borderRadius: 5,
                borderColor: '#fff'
            },
            data: [
                { name: 'wind', value: 15 },
                { name: 'rain', value: 18 },
                { name: 'thunder', value: 10 },
                { name: 'electric', value: 12 },
                { name: 'light', value: 23 }
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
