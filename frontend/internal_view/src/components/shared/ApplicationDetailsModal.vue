<script setup>
import { X, UserRound } from 'lucide-vue-next'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import { getDisplayName } from '@/data/mockClients'

const props = defineProps({
  application: {
    type: Object,
    required: true,
  },
})

defineEmits(['close', 'view-client'])

function formatCurrency(n) {
  return `₱${Number(n ?? 0).toLocaleString()}`
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between rounded-t-2xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Application Details</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 space-y-5 overflow-y-auto p-6">
<div class="flex items-center justify-between">
  <div>
    <p class="text-lg font-semibold text-slate-800">
      {{ application.client ? getDisplayName(application.client) : '—' }}
    </p>
    <p class="text-xs text-slate-400">
      {{ application.application_code }} · {{ application.type }}
    </p>
  </div>
  <StatusBadge :status="application.status" />
</div>

<button
  v-if="application.client"
  class="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
  @click="$emit('view-client', application.client)"
>
  <UserRound class="h-3.5 w-3.5" />
  View Client Profile
</button>

        <div class="grid grid-cols-2 gap-y-2 border-t border-slate-100 pt-4 text-sm">
          <p class="text-slate-400">Amount Requested</p>
          <p class="text-slate-700">{{ formatCurrency(application.amount) }}</p>
          <p class="text-slate-400">Barangay</p>
          <p class="text-slate-700">{{ application.barangay || '—' }}</p>
          <p class="text-slate-400">Date Submitted</p>
          <p class="text-slate-700">{{ application.date_submitted }}</p>
          <p class="text-slate-400">Submitted By</p>
          <p class="text-slate-700">{{ application.submitted_by || '—' }}</p>
        </div>

        <!-- ASSESSMENT -->
        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            I. Assessment
          </p>
          <div class="space-y-2 text-sm">
            <p v-if="application.income_expenditure">
              <span class="text-slate-400">Income/Expenditure: </span>
              <span class="text-slate-700">{{ application.income_expenditure }}</span>
            </p>
            <p v-if="application.economic_condition">
              <span class="text-slate-400">Economic Condition: </span>
              <span class="text-slate-700">{{ application.economic_condition }}</span>
            </p>
            <p v-if="application.problems_presented?.length">
              <span class="text-slate-400">Problems Presented: </span>
              <span class="text-slate-700">{{ application.problems_presented.join(', ') }}</span>
            </p>
            <p v-if="application.client_categories?.length">
              <span class="text-slate-400">Client Category: </span>
              <span class="text-slate-700">{{ application.client_categories.join(', ') }}</span>
            </p>
            <div v-if="application.specific_findings">
              <p class="text-slate-400">Specific Findings:</p>
              <p class="mt-1 rounded-lg bg-slate-50 p-3 text-slate-700">
                {{ application.specific_findings }}
              </p>
            </div>
          </div>
        </div>

        <!-- EVALUATION -->
        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            II. Evaluation / Recommendation
          </p>
          <div class="space-y-2 text-sm">
            <p v-if="application.evaluation_factors?.length">
              <span class="text-slate-400">Factors: </span>
              <span class="text-slate-700">{{ application.evaluation_factors.join(', ') }}</span>
            </p>
            <p v-if="application.eligibility">
              <span class="text-slate-400">Eligibility: </span>
              <span
                class="font-medium"
                :class="application.eligibility === 'Eligible' ? 'text-emerald-600' : 'text-red-600'"
              >
                {{ application.eligibility }}
              </span>
            </p>
            <div v-if="application.recommendation">
              <p class="text-slate-400">Recommendation:</p>
              <p class="mt-1 rounded-lg bg-slate-50 p-3 text-slate-700">
                {{ application.recommendation }}
              </p>
            </div>
            <p v-if="application.informant_name">
              <span class="text-slate-400">Informant: </span>
              <span class="text-slate-700">{{ application.informant_name }}</span>
            </p>
            <p v-if="application.interviewed_by">
              <span class="text-slate-400">Interviewed By: </span>
              <span class="text-slate-700">{{ application.interviewed_by }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>