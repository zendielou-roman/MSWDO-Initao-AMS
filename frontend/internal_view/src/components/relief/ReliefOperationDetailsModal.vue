<script setup>
import { X } from 'lucide-vue-next'
import ReliefStatusBadge from '@/components/shared/ReliefStatusBadge.vue'

const STATUS_FLOW = ['Planned', 'Pending', 'Ongoing', 'Completed']

const props = defineProps({
  operation: {
    type: Object,
    required: true,
  },
  canAdvance: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'advance'])

const next = STATUS_FLOW[STATUS_FLOW.indexOf(props.operation.status) + 1] ?? null
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between rounded-t-2xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Relief Operation Details</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 space-y-5 overflow-y-auto p-6">
        <div>
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold text-slate-800">{{ operation.event }}</p>
            <ReliefStatusBadge :status="operation.status" />
          </div>
          <p class="text-xs text-slate-400">
            {{ operation.operation_code }} · {{ operation.type }}
          </p>
        </div>

  <div class="border-t border-slate-100 pt-4">
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Date</p>
            <p class="text-slate-700">{{ operation.date }}</p>
            <p class="text-slate-400">Barangay</p>
            <p class="text-slate-700">{{ operation.barangay }}</p>
            <p class="text-slate-400">Beneficiaries</p>
            <p class="text-slate-700">
              {{ operation.beneficiaries }} {{ operation.beneficiary_unit }}
            </p>
            <p class="text-slate-400">Items Distributed</p>
            <p class="text-slate-700">
              {{ operation.items_distributed }} {{ operation.item_unit }}
            </p>
            <p class="text-slate-400">Logged By</p>
            <p class="text-slate-700">{{ operation.logged_by || '—' }}</p>
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