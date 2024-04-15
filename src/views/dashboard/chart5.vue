<template>
    <div style="width: 100%; height: 100%; position: relative">
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
import { RadarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, RadarChart, GridComponent, LabelLayout])

// data
const chartOption = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    radar: {
        radius: '100',
        splitNumber: 8,
        splitArea: {
            areaStyle: {
                color: 'rgba(127,95,132,.3)',
                opacity: 1,
                shadowBlur: 45,
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 15
            }
        },
        indicator: [
            { name: 'intelligence quotient', max: 20000 },
            { name: 'weight', max: 20000 },
            { name: 'height', max: 20000 },
            { name: 'emotional quotient', max: 20000 },
            { name: 'age', max: 20000 },
            { name: 'strength', max: 20000 }
        ]
    },
    series: [{
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
            normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
            }
        },
        data: [
            {
                value: [15000, 7000, 12000, 11000, 15000, 14000],
                name: 'Joy'
            },
            {
                value: [14000, 9000, 15000, 15000, 13000, 11000],
                name: 'Bobo'
            },
            {
                value: [15500, 11000, 12000, 15000, 12000, 12000],
                name: 'Avata'
            }
        ],
        animationDuration: 3000
    }]
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
