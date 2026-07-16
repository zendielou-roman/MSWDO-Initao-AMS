<!-- src/components/focal/AICSFocalDashboardExtras.vue -->
<script setup>
import { computed } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { aicsFocalStats } from '@/data/mockAICSDashboard'

const percentUtilized = computed(() =>
  Math.round((aicsFocalStats.budgetReleased / aicsFocalStats.budgetAllocated) * 100),
)
const remaining = computed(() => aicsFocalStats.budgetAllocated - aicsFocalStats.budgetReleased)

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}
</script>

<template>
  <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <!-- AICS Applications Pending -->
    <div class="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <AlertCircle class="h-5 w-5 text-amber-600" />
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">
          AICS Applications Pending
        </p>
        <p class="font-anton text-2xl text-slate-800">{{ aicsFocalStats.pendingApplications }}</p>
        <p class="text-xs text-amber-600">{{ aicsFocalStats.pendingNote }}</p>
      </div>
    </div>

    <!-- AICS Budget -->
    <div class="rounded-xl border border-slate-100 bg-white p-5">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
        AICS Budget — Released vs Allocated
      </p>
      <p class="mt-1 font-anton text-2xl text-slate-800">
        {{ formatCurrency(aicsFocalStats.budgetReleased) }}
        <span class="text-sm font-normal text-slate-400"
          >of {{ formatCurrency(aicsFocalStats.budgetAllocated) }}</span
        >
      </p>
      <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full bg-[#001d4c]"
          :style="{ width: percentUtilized + '%' }"
        ></div>
      </div>
      <p class="mt-1 text-xs text-slate-400">
        {{ percentUtilized }}% utilized · {{ formatCurrency(remaining) }} remaining
      </p>
    </div>
  </div>
</template>
