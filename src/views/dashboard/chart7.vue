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
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, BarChart, LineChart, GridComponent, LegendComponent])

// data
const chartOption = ref({
    grid: { // padding
        top: '40',
        left: '20',
        right: '20',
        bottom: '50',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['2018年', '2019年', '2020年', '2021年', '2022年', '2023年', '2024年'],
        axisLabel: { // 设置外面刻度字符串颜色
            color: '#0ec1cd'
        },
        axisLine: { // 设置刻度颜色
            lineStyle: {
                color: '#0ec1cd'
            }
        }
    }, {
        type: 'value',
        show: false
    }],
    yAxis: {
        type: 'value',
        axisLabel: { // 设置外面刻度字符串颜色
            show: false
        },
        axisTick: { // 设置刻度分割线
            show: false
        },
        axisLine: { // 设置刻度颜色
            show: false
        },
        splitLine: { // 设置网格颜色
            show: false
        }
    },
    series: [
        {
            name: '上半年销售额',
            data: [112, 225, 259, 201, 350, 385, 480],
            type: 'bar',
            barWidth: 20,
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
                        { offset: 0, color: 'rgba(69, 229, 255, 0.3)' },
                        { offset: 1, color: 'rgba(69, 229, 255, 1)' }
                    ]
                }
            }
        },
        {
            name: '下半年销售额',
            data: [212, 325, 359, 301, 450, 485, 580],
            type: 'bar',
            barWidth: 20,
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
                        { offset: 0, color: 'rgba(255, 145, 90, 0.3)' },
                        { offset: 1, color: 'rgba(255, 145, 90, 1)' }
                    ]
                }
            }
        },
        {
            name: '合计',
            data: [324, 550, 618, 502, 800, 870, 1060],
            type: 'bar',
            barWidth: 20,
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
                        { offset: 0, color: 'rgba(219, 33, 74, 0.3)' },
                        { offset: 1, color: 'rgba(219, 33, 74, 1)' }
                    ]
                }
            }
        },
        {
            name: '合计',
            data: [324, 550, 618, 502, 800, 870, 1060].map((v, i) => [66.5 + i * 100, v + 20]),
            type: 'line',
            smooth: false,
            xAxisIndex: 1,
            animationDuration: 3000,
            itemStyle: {
                color: '#C6193F'
            }
        }
    ]
})
</script>

<style lang="scss" scoped>
</style>
