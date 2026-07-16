<script setup>
import { ref, computed } from 'vue'
import { HandCoins, ListChecks, Clock, CircleCheck, Plus, Search } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import DonationStatusBadge from '@/components/shared/DonationStatusBadge.vue'
import RecordDonationModal from '@/components/donations/RecordDonationModal.vue'
import { mockDonations, donationTypes } from '@/data/mockDonations'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/config/roleConfig'

const auth = useAuthStore()
const canRecordDonation = computed(() => [ROLES.OIC, ROLES.STAFF].includes(auth.user?.role))

const donations = ref([...mockDonations])
const searchQuery = ref('')
const typeFilter = ref('all')
const statusFilter = ref('all')

// NEW: modal + toast state
const showRecordModal = ref(false)
const toastMessage = ref('')

const kpis = computed(() => ({
  totalValue: donations.value.reduce((sum, d) => sum + (d.value || 0), 0),
  records: donations.value.length,
  pending: donations.value.filter((d) => d.status === 'Pending').length,
  acknowledged: donations.value.filter((d) => d.status === 'Acknowledged').length,
}))

const filteredDonations = computed(() => {
  return donations.value.filter((d) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = d.donor.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
    const matchesType = typeFilter.value === 'all' || d.type === typeFilter.value
    const matchesStatus = statusFilter.value === 'all' || d.status === statusFilter.value
    return matchesSearch && matchesType && matchesStatus
  })
})

function formatValue(d) {
  return d.value === null ? 'In-kind' : `₱${d.value.toLocaleString()}`
}

// NEW: generates the next DN-#### id
function nextDonationId() {
  const nums = donations.value
    .map((d) => parseInt(d.id.replace('DN-', ''), 10))
    .filter((n) => !isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `DN-${String(max + 1).padStart(4, '0')}`
}

function handleCreateDonation(newDonation) {
  donations.value.unshift({
    id: nextDonationId(),
    ...newDonation,
  })
  showRecordModal.value = false

  toastMessage.value = `Donation from ${newDonation.donor} recorded successfully`
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Track cash, goods, and in-kind donations received by MSWDO.
      </p>
      <button
        v-if="canRecordDonation"
        class="flex shrink-0 items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showRecordModal = true"
      >
        <Plus class="h-4 w-4" />
        Record New Donation
      </button>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        label="Total Value"
        :value="`₱${kpis.totalValue.toLocaleString()}`"
        :icon="HandCoins"
      />
      <KPICard label="Records" :value="kpis.records" :icon="ListChecks" />
      <KPICard label="Pending" :value="kpis.pending" :icon="Clock" />
      <KPICard label="Acknowledged" :value="kpis.acknowledged" :icon="CircleCheck" />
    </div>

    <!-- SEARCH + FILTERS -->
    <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by donor or ID..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="typeFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All types</option>
        <option v-for="t in donationTypes" :key="t" :value="t">{{ t }}</option>
      </select>
      <select
        v-model="statusFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All statuses</option>
        <option value="Pending">Pending</option>
        <option value="Recorded">Recorded</option>
        <option value="Acknowledged">Acknowledged</option>
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
            <th class="px-5 py-3 font-medium">Donor</th>
            <th class="px-5 py-3 font-medium">Type</th>
            <th class="px-5 py-3 font-medium">Value</th>
            <th class="px-5 py-3 font-medium">Received</th>
            <th class="px-5 py-3 font-medium">Allocated To</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="d in filteredDonations"
            :key="d.id"
            class="cursor-pointer border-b border-slate-50 hover:bg-slate-50"
          >
            <td class="px-5 py-3 text-slate-500">{{ d.id }}</td>
            <td class="px-5 py-3 font-medium text-slate-700">{{ d.donor }}</td>
            <td class="px-5 py-3 text-slate-600">{{ d.type }}</td>
            <td
              class="px-5 py-3"
              :class="d.value === null ? 'text-slate-400 italic' : 'text-slate-700'"
            >
              {{ formatValue(d) }}
            </td>
            <td class="px-5 py-3 text-slate-500">{{ d.dateReceived }}</td>
            <td class="px-5 py-3 text-slate-600">{{ d.allocatedTo }}</td>
            <td class="px-5 py-3"><DonationStatusBadge :status="d.status" /></td>
          </tr>
          <tr v-if="filteredDonations.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-sm text-slate-400">
              No donations match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NEW: Record Donation Modal -->
    <RecordDonationModal
      v-if="showRecordModal"
      @close="showRecordModal = false"
      @create="handleCreateDonation"
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
