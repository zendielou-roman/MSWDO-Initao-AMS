<!-- src/components/shared/KPICard.vue -->
<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  note: { type: String, default: '' },
  icon: { type: [Object, Function], required: true }, // ✅ accepts both
})
</script>

<template>
  <div class="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
    <div class="flex items-start justify-between">
      <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{{ label }}</p>
      <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
        <component :is="icon" class="h-4 w-4 text-slate-500" />
      </div>
    </div>
    <p class="mt-2 font-anton text-2xl text-slate-800">{{ value }}</p>
    <p v-if="note" class="mt-1 text-xs text-slate-400">{{ note }}</p>
  </div>
</template>
