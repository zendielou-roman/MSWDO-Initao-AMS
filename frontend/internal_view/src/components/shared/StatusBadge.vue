<!-- src/components/shared/StatusBadge.vue -->
<script setup>
defineProps({ status: { type: String, required: true } })

const styles = {
  Pending: 'bg-amber-50 text-amber-600',
  Approved: 'bg-emerald-50 text-emerald-600',
  Rejected: 'bg-red-50 text-red-600',
  Released: 'bg-blue-50 text-blue-600',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="styles[status] || 'bg-slate-100 text-slate-600'"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
    {{ status }}
  </span>
</template>
