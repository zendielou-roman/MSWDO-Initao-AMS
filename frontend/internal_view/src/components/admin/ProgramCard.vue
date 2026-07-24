<!-- src/components/admin/ProgramCard.vue -->
<script setup>
const props = defineProps({
  program: { type: Object, required: true },
})
const emit = defineEmits(['edit', 'toggle-status'])

const percentSpent = Math.round((props.program.released / props.program.allocated) * 100)

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  'On Hold': 'bg-amber-50 text-amber-600',
  Inactive: 'bg-slate-100 text-slate-500',
}
</script>

<template>
  <div class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-[11px] font-medium text-slate-400">{{ program.program_code }}</p>
        <p class="font-anton text-lg text-slate-800">{{ program.name }}</p>
      </div>
      <span
        class="rounded-full px-2.5 py-1 text-xs font-semibold"
        :class="statusStyles[program.status]"
      >
        {{
          program.status === 'Active'
            ? '● Active'
            : program.status === 'On Hold'
              ? '● On Hold'
              : program.status
        }}
      </span>
    </div>

    <p class="mt-1 text-xs text-slate-400">{{ program.description }}</p>

    <div class="mt-4">
      <div class="flex items-center justify-between text-xs">
        <span class="font-medium text-slate-500">Budget Spent</span>
        <span class="font-semibold text-slate-700">{{ percentSpent }}%</span>
      </div>
      <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-[#001d4c]" :style="{ width: percentSpent + '%' }"></div>
      </div>
      <div class="mt-2 flex justify-between text-xs">
        <div>
          <p class="font-semibold text-slate-700">{{ formatCurrency(program.allocated) }}</p>
          <p class="text-[10px] uppercase tracking-wide text-slate-400">Allocated</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-amber-600">{{ formatCurrency(program.released) }}</p>
          <p class="text-[10px] uppercase tracking-wide text-slate-400">Released</p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
      <p class="text-xs text-slate-500">
        Focal: <span class="font-medium text-slate-700">{{ program.focalPerson }}</span>
      </p>
      <div class="flex items-center gap-2">
        <button
          class="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
          @click="emit('edit', program)"
        >
          Edit
        </button>
        <button
          v-if="program.status === 'Active'"
          class="rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200"
          @click="emit('toggle-status', program)"
        >
          Hold
        </button>
        <button
          v-else
          class="rounded-md bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
          @click="emit('toggle-status', program)"
        >
          Activate
        </button>
      </div>
    </div>
  </div>
</template>
