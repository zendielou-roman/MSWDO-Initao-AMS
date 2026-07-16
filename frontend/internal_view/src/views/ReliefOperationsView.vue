<script setup>
import { ref, computed } from 'vue'
import { Package, Users, Boxes, ClipboardList, Plus, Search } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import ReliefStatusBadge from '@/components/shared/ReliefStatusBadge.vue'
import LogReliefOperationModal from '@/components/relief/LogReliefOperationModal.vue'
import { mockReliefOperations, reliefOperationTypes } from '@/data/mockReliefOperations'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/config/roleConfig'

const auth = useAuthStore()
const canLogRelief = computed(() => [ROLES.OIC, ROLES.STAFF].includes(auth.user?.role))

const operations = ref([...mockReliefOperations])
const searchQuery = ref('')
const typeFilter = ref('all')
const statusFilter = ref('all')

// NEW: modal + toast state
const showLogModal = ref(false)
const toastMessage = ref('')

const kpis = computed(() => ({
  operationsThisQuarter: operations.value.length,
  totalBeneficiariesServed: operations.value.reduce((sum, r) => sum + r.beneficiaries, 0),
  totalItemsDistributed: operations.value.reduce((sum, r) => sum + r.itemsDistributed, 0),
  pendingApproval: operations.value.filter((r) => r.status === 'Pending').length,
}))

const filteredOperations = computed(() => {
  return operations.value.filter((op) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch =
      op.event.toLowerCase().includes(q) ||
      op.id.toLowerCase().includes(q) ||
      op.barangay.toLowerCase().includes(q)
    const matchesType = typeFilter.value === 'all' || op.type === typeFilter.value
    const matchesStatus = statusFilter.value === 'all' || op.status === statusFilter.value
    return matchesSearch && matchesType && matchesStatus
  })
})

// NEW: generates the next RO-#### id
function nextOperationId() {
  const nums = operations.value
    .map((o) => parseInt(o.id.replace('RO-', ''), 10))
    .filter((n) => !isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `RO-${String(max + 1).padStart(4, '0')}`
}

function handleCreateOperation(newOp) {
  operations.value.unshift({
    id: nextOperationId(),
    ...newOp,
  })
  showLogModal.value = false

  toastMessage.value = `Relief operation "${newOp.event}" logged successfully`
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Log emergency responses and community relief distributions.
      </p>
      <button
        v-if="canLogRelief"
        class="flex shrink-0 items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showLogModal = true"
      >
        <Plus class="h-4 w-4" />
        Log New Relief Operation
      </button>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        label="Operations This Quarter"
        :value="kpis.operationsThisQuarter"
        :icon="Package"
      />
      <KPICard label="Beneficiaries Served" :value="kpis.totalBeneficiariesServed" :icon="Users" />
      <KPICard label="Items Distributed" :value="kpis.totalItemsDistributed" :icon="Boxes" />
      <KPICard label="Pending Approval" :value="kpis.pendingApproval" :icon="ClipboardList" />
    </div>

    <!-- SEARCH + FILTERS -->
    <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by event, ID, or barangay..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="typeFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All types</option>
        <option v-for="t in reliefOperationTypes" :key="t" :value="t">{{ t }}</option>
      </select>
      <select
        v-model="statusFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All statuses</option>
        <option value="Planned">Planned</option>
        <option value="Pending">Pending</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <!-- TABLE -->
    <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">ID</th>
            <th class="px-5 py-3 font-medium">Event</th>
            <th class="px-5 py-3 font-medium">Date</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">Type</th>
            <th class="px-5 py-3 font-medium">Beneficiaries</th>
            <th class="px-5 py-3 font-medium">Items Distributed</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="op in filteredOperations"
            :key="op.id"
            class="cursor-pointer border-b border-slate-50 hover:bg-slate-50"
          >
            <td class="px-5 py-3 text-slate-500">{{ op.id }}</td>
            <td class="px-5 py-3 font-medium text-slate-700">{{ op.event }}</td>
            <td class="px-5 py-3 text-slate-500">{{ op.date }}</td>
            <td class="px-5 py-3 text-slate-600">{{ op.barangay }}</td>
            <td class="px-5 py-3 text-slate-600">{{ op.type }}</td>
            <td class="px-5 py-3 text-slate-600">
              {{ op.beneficiaries }} {{ op.beneficiaryUnit }}
            </td>
            <td class="px-5 py-3 text-slate-600">{{ op.itemsDistributed }} {{ op.itemUnit }}</td>
            <td class="px-5 py-3"><ReliefStatusBadge :status="op.status" /></td>
          </tr>
          <tr v-if="filteredOperations.length === 0">
            <td colspan="8" class="px-5 py-8 text-center text-sm text-slate-400">
              No relief operations match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NEW: Log Relief Operation Modal -->
    <LogReliefOperationModal
      v-if="showLogModal"
      @close="showLogModal = false"
      @create="handleCreateOperation"
    />

    <!-- NEW: Success toast -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-[60] rounded-lg bg-[#001d4c] px-4 py-3 text-sm font-medium text-white shadow-lg"
      >
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>
