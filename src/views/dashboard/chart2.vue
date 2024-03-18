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
import { PictorialBarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import myTitle from './title.vue'

use([SVGRenderer, PictorialBarChart, GridComponent])

// data
const chartOption = ref({
    grid: { // padding
        top: '40',
        left: '20',
        right: '20',
        bottom: '50',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
            data: [100, 300, 200, 400, 400, 600, 900, 1100],
            type: 'pictorialBar',
            symbol: 'rect',
            symbolRepeat: true,
            symbolSize: ['30px', '6px'],
            barWidth: '30px',
            animationEasing: 'elasticOut',
            animationDuration: 3000,
            z: 2,
            animationDelay: (_, param) => {
                return param ? param.index * 150 : 0
            },
            itemStyle: {
                borderRadius: '2',
                color: '#0ec1cd'
            }
        },
        {
            data: [100, 300, 200, 400, 400, 600, 900, 1100],
            symbol: 'rect',
            type: 'pictorialBar',
            symbolSize: ['30px', '6px'],
            barWidth: '30px',
            symbolRepeat: 'fixed',
            z: 1,
            animation: false,
            itemStyle: {
                color: '#eee'
            }
        }
    ]
})
</script>

<style lang="scss" scoped>
</style>
