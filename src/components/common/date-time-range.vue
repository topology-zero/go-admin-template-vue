<template>
    <el-date-picker v-model="rangeTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    size="mini"
                    clearable
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :change="setParamsTime()"
                    :default-time="['00:00:00','23:59:59']" />
</template>
<script>
export default {
    data() {
        return {
            rangeTime: []
        }
    },
    methods: {
        setParamsTime() {
            if (!this.rangeTime || this.rangeTime.lenght == 0) {
                [this.params.startTime, this.params.endTime] = ['', '']
            } else {
                [this.params.startTime, this.params.endTime] = [this.rangeTime[0], this.rangeTime[1]]
            }
        }
    }
}
</script>
