<script setup>
import { X } from 'lucide-vue-next'
import DonationStatusBadge from '@/components/shared/DonationStatusBadge.vue'


const STATUS_FLOW = ['Pending', 'Recorded', 'Acknowledged']

const props = defineProps({
  donation: {
    type: Object,
    required: true,
  },
  canAdvance: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'advance'])

const next = STATUS_FLOW[STATUS_FLOW.indexOf(props.donation.status) + 1] ?? null

function formatValue(d) {
  return d.value === null || d.value === undefined ? 'In-kind' : `₱${Number(d.value).toLocaleString()}`
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between rounded-t-2xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Donation Details</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 space-y-5 overflow-y-auto p-6">
        <div>
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold text-slate-800">{{ donation.donor }}</p>
            <DonationStatusBadge :status="donation.status" />
          </div>
          <p class="text-xs text-slate-400">
            {{ donation.donation_code }} · {{ donation.type }}
          </p>
        </div>

        <div class="border-t border-slate-100 pt-4">
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Value</p>
            <p class="text-slate-700">{{ formatValue(donation) }}</p>
            <p class="text-slate-400">Date Received</p>
            <p class="text-slate-700">{{ donation.date_received }}</p>
            <p class="text-slate-400">Allocated To</p>
            <p class="text-slate-700">{{ donation.allocated_to || '—' }}</p>
            <p class="text-slate-400">Recorded By</p>
            <p class="text-slate-700">{{ donation.recorded_by || '—' }}</p>
          </div>
        </div>

        <div v-if="canAdvance && next" class="border-t border-slate-100 pt-4">
          <button
            class="w-full rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#012a63]"
            @click="emit('advance', next)"
          >
            Mark as {{ next }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>