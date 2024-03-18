<template>
    <div style="width: 100%; height: 100%;">
        <my-title title="决策支持" />
        <v-chart :option="chartOption"
                 autoresize />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, BarChart, GridComponent, LegendComponent])

// data
const chartOption = ref({
    grid: { // padding
        top: '40',
        left: '20',
        right: '20',
        bottom: '50',
        containLabel: true
    },
    legend: {
        show: true,
        left: 'center',
        top: 20,
        itemGap: 20,
        textStyle: {
            color: '#0ec1cd'
        }
    },
    xAxis: {
        type: 'value',
        axisLabel: { // 设置外面刻度字符串颜色
            show: false
        },
        axisLine: { // 设置刻度颜色
            show: false
        },
        splitLine: { // 设置网格颜色
            show: false
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: ['etcd', 'kubernetes', 'docker', 'istio'],
        axisLabel: { // 设置外面刻度字符串颜色
            color: '#0ec1cd'
        },
        axisLine: { // 设置刻度颜色
            lineStyle: {
                color: '#0ec1cd'
            }
        }
    },
    series: [
        {
            name: 'starred',
            data: [2, 8, 9, 5],
            type: 'bar',
            barWidth: 14,
            smooth: false,
            animationDuration: 3000,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(69, 229, 255, 1)' },
                        { offset: 1, color: 'rgba(69, 229, 255, 0.3)' }
                    ]
                }
            }
        },
        {
            name: 'fork',
            data: [1, 5, 4, 3],
            type: 'bar',
            barWidth: 14,
            smooth: false,
            animationDuration: 3000,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(255, 145, 90, 1)' },
                        { offset: 1, color: 'rgba(255, 145, 90, 0.3)' }
                    ]
                }
            }
        }
    ]
})
</script>

<style lang="scss" scoped>
</style>
