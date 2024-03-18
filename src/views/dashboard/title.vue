<template>
    <div class="chart-title">
        <svg-icon icon-class="arrow"
                  class="arrow" />
        <div class="title">{{ title }}</div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'test title'
    }
})
</script>

<style lang="scss" scoped>
.chart-title {
    display: flex;
    margin: 20px 0 0 20px;
    .arrow {
        fill: #039ba7;
    }
    .title {
        margin-left: 10px;
        font-weight: 800;
        color: #039ba7;
    }
}
</style>
