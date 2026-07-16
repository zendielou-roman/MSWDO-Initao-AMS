<!-- src/components/oic/NeedsMyApprovalWidget.vue -->
<script setup>
import { ref } from 'vue'
import { CircleCheck, CircleX, ClipboardCheck } from 'lucide-vue-next'
import { pendingApprovalQueue } from '@/data/mockOICApprovalQueue'

const queue = ref([...pendingApprovalQueue])

function formatAmount(a) {
  return a === null ? '—' : `₱${a.toLocaleString()}`
}

function approve(item) {
  queue.value = queue.value.filter((q) => q.id !== item.id)
}

function reject(item) {
  queue.value = queue.value.filter((q) => q.id !== item.id)
}
</script>

<template>
  <div class="rounded-xl border border-amber-200 bg-amber-50 p-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <ClipboardCheck class="h-5 w-5 text-amber-600" />
        <p class="font-anton text-base text-slate-800">Needs My Approval</p>
      </div>
      <span class="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-[#001d4c]">
        {{ queue.length }} pending
      </span>
    </div>

    <div class="mt-3 space-y-2">
      <div
        v-for="item in queue"
        :key="item.id"
        class="flex items-center justify-between gap-3 rounded-lg bg-white p-3"
      >
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-slate-700">{{ item.clientName }}</p>
          <p class="text-xs text-slate-400">
            {{ item.type }} · {{ item.id }} · by {{ item.submittedBy }}
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-3">
          <span class="text-sm font-semibold text-slate-700">{{ formatAmount(item.amount) }}</span>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            aria-label="Approve"
            @click="approve(item)"
          >
            <CircleCheck class="h-4 w-4" />
          </button>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
            aria-label="Reject"
            @click="reject(item)"
          >
            <CircleX class="h-4 w-4" />
          </button>
        </div>
      </div>

      <p v-if="queue.length === 0" class="py-6 text-center text-sm text-slate-400">
        All caught up — nothing pending your approval.
      </p>
    </div>
  </div>
</template>
