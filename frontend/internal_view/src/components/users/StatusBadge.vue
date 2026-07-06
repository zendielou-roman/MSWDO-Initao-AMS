<!-- src/components/users/StatusBadge.vue -->
<script setup>
const props = defineProps({
  status: { type: String, required: true },
})

const styles = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-rose-100 text-rose-700',
}

const dotStyles = {
  Active: 'bg-emerald-500',
  Inactive: 'bg-rose-500',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
    :class="styles[props.status] || 'bg-slate-100 text-slate-600'"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="dotStyles[props.status] || 'bg-slate-400'" />
    {{ props.status }}
  </span>
</template>
