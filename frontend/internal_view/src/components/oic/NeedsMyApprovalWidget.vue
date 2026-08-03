<!-- src/components/oic/NeedsMyApprovalWidget.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { CircleCheck, CircleX, ClipboardCheck } from 'lucide-vue-next'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import { getDisplayName } from '@/data/mockClients'
import api from '@/lib/api'

const queue = ref([])
const isLoading = ref(true)

async function fetchQueue() {
  try {
    const response = await api.get('/applications')
    queue.value = response.data.filter((a) => a.status === 'Pending')
  } catch (error) {
    console.error('Failed to fetch approval queue:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchQueue)

function formatAmount(a) {
  return a === null || a === undefined ? '—' : `₱${Number(a).toLocaleString()}`
}

const pendingAction = ref(null) // { item, status } | null

function approve(item) {
  pendingAction.value = { item, status: 'Approved' }
}

function reject(item) {
  pendingAction.value = { item, status: 'Rejected' }
}

function cancelAction() {
  pendingAction.value = null
}

async function confirmAction() {
  const { item, status } = pendingAction.value
  pendingAction.value = null

  try {
    await api.put(`/applications/${item.id}`, { status })
    queue.value = queue.value.filter((q) => q.id !== item.id)
  } catch (error) {
    console.error('Failed to update application:', error)
  }
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
<p class="truncate text-sm font-medium text-slate-700">
  {{ item.client ? getDisplayName(item.client) : '—' }}
</p>
<p class="text-xs text-slate-400">
  {{ item.type }} · {{ item.application_code }} · by {{ item.submitted_by }}
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
    <ConfirmDialog
  v-if="pendingAction"
  :title="pendingAction.status === 'Approved' ? 'Approve this application?' : 'Reject this application?'"
  :message="
    pendingAction.status === 'Approved'
      ? `This will approve ${formatAmount(pendingAction.item.amount)} in assistance for ${pendingAction.item.clientName}. This action cannot be undone from here.`
      : `This will reject ${pendingAction.item.clientName}'s application. This action cannot be undone from here.`
  "
  :confirm-label="pendingAction.status === 'Approved' ? 'Approve' : 'Reject'"
  cancel-label="Cancel"
  :variant="pendingAction.status === 'Approved' ? 'default' : 'danger'"
  @confirm="confirmAction"
  @cancel="cancelAction"
/>
  </div>
</template>
