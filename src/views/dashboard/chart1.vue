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
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, LineChart, GridComponent, LegendComponent])

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
        top: 10,
        itemGap: 20,
        textStyle: {
            color: '#0ec1cd'
        }
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: { // 设置外面刻度字符串颜色
            color: '#0ec1cd'
        },
        axisLine: { // 设置刻度颜色
            lineStyle: {
                color: '#0ec1cd'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: { // 设置外面刻度字符串颜色
            show: true,
            color: '#0ec1cd'
        },
        axisLine: { // 设置刻度颜色
            show: true,
            lineStyle: {
                color: '#0ec1cd'
            }
        },
        splitLine: { // 设置网格颜色
            lineStyle: {
                color: 'rgba(12, 156, 167, .5)',
                type: 'dashed'
            }
        }
    },
    series: [
        {
            name: 'PV',
            data: [100, 300, 200, 500, 400, 600, 500, 700, 600, 800, 700, 900],
            type: 'line',
            smooth: true,
            animationDuration: 3000,
            itemStyle: { // 设置折线颜色
                color: '#07DBFF',
                lineStyle: {
                    color: '#07DBFF'
                }
            },
            areaStyle: { // 设置折线背景颜色
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
            name: 'UV',
            data: [300, 200, 500, 400, 600, 500, 700, 600, 800, 700, 900, 800],
            type: 'line',
            smooth: true,
            animationDuration: 3000,
            itemStyle: { // 设置折线颜色
                color: '#fc8452',
                lineStyle: {
                    color: '#fc8452'
                }
            },
            areaStyle: { // 设置折线背景颜色
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
