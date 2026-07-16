<!-- src/components/shared/ReliefStatusBadge.vue -->
<script setup>
import { reliefStatusStyles } from '@/data/mockReliefOperations'
defineProps({ status: { type: String, required: true } })
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="reliefStatusStyles[status] || 'bg-slate-100 text-slate-600'"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
    {{ status }}
  </span>
</template>
