<!-- src/components/users/RoleBadge.vue -->
<script setup>
const props = defineProps({
  role: { type: String, required: true },
})

const styles = {
  Administrator: 'bg-[#001d4c]/10 text-[#001d4c]',
  'Social Worker': 'bg-sky-100 text-sky-700',
  Encoder: 'bg-slate-100 text-slate-600',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="styles[props.role] || 'bg-slate-100 text-slate-600'"
  >
    {{ props.role }}
  </span>
</template>
