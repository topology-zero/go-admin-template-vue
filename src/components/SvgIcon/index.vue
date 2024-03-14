<template>
    <svg class="svg-icon"
         aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    iconClass: {
        type: String,
        required: true
    }
})

const iconName = computed(() => {
    return `#icon-${props.iconClass}`
})

</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
