<template>
  <span
    class="inline-flex items-center gap-1.5 text-xs font-medium"
    :class="textColor"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="dotColor" />
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const isActive = computed(() => props.status === 'Active')
const dotColor = computed(() => (isActive.value ? 'bg-green-500' : 'bg-slate-400'))
const textColor = computed(() => (isActive.value ? 'text-green-600' : 'text-slate-500'))
</script>
