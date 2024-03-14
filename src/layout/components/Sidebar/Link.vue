<template>
    <component :is="type"
               v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

const isExternalPath = computed(() => isExternal(props.to))

const type = computed(() => {
    return isExternalPath.value ? 'a' : 'router-link'
})

const linkProps = (to) => {
    if (isExternalPath.value) {
        return {
            href: to,
            target: '_blank',
            rel: 'noopener'
        }
    }
    return {
        to: to
    }
}
</script>
