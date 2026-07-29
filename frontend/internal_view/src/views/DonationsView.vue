<script setup>
import { ref, computed, onMounted } from 'vue'
import { HandCoins, ListChecks, Clock, CircleCheck, Plus, Search, Eye, Pencil } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import DonationStatusBadge from '@/components/shared/DonationStatusBadge.vue'
import RecordDonationModal from '@/components/donations/RecordDonationModal.vue'
import DonationDetailsModal from '@/components/donations/DonationDetailsModal.vue'
import { donationTypes } from '@/data/mockDonations'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/config/roleConfig'
import api from '@/lib/api'


const auth = useAuthStore()
const canRecordDonation = computed(() => [ROLES.OIC, ROLES.STAFF].includes(auth.user?.role))

const donations = ref([])
const isLoading = ref(true)

async function fetchDonations() {
  try {
    const response = await api.get('/donations')
    donations.value = response.data.map((d) => ({
      ...d,
      dateReceived: d.date_received,
      allocatedTo: d.allocated_to,
    }))
  } catch (error) {
    console.error('Failed to fetch donations:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchDonations)

const viewingDonation = ref(null)

async function handleUpdateStatus(donation, newStatus) {
  try {
    const response = await api.put(`/donations/${donation.id}`, {
      status: newStatus,
    })
    const index = donations.value.findIndex((d) => d.id === donation.id)
    if (index !== -1) {
      donations.value[index] = { ...donations.value[index], status: response.data.status }
    }
  } catch (error) {
    console.error('Failed to update donation status:', error)
  }
}

const searchQuery = ref('')
const typeFilter = ref('all')
const statusFilter = ref('all')

// NEW: modal + toast state
// NEW: modal + toast state
const showRecordModal = ref(false)
const editingDonation = ref(null)
const toastMessage = ref('')

function openEditModal(donation) {
  editingDonation.value = donation
  showRecordModal.value = true
}

function closeRecordModal() {
  showRecordModal.value = false
  editingDonation.value = null
}

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
async function handleCreateDonation(newDonation) {
  try {
    const response = await api.post('/donations', {
      donor: newDonation.donor,
      type: newDonation.type,
      value: newDonation.value,
      date_received: newDonation.dateReceived,
      allocated_to: newDonation.allocatedTo,
      status: newDonation.status || 'Pending',
      recorded_by: auth.user?.name || null,
    })

    donations.value.unshift({
      ...response.data,
      dateReceived: response.data.date_received,
      allocatedTo: response.data.allocated_to,
    })

    showRecordModal.value = false

    toastMessage.value = `Donation from ${newDonation.donor} recorded successfully`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to record donation:', error)
    toastMessage.value = 'Failed to record donation.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
}

async function handleUpdateDonation({ id, payload }) {
  try {
    const response = await api.put(`/donations/${id}`, {
      donor: payload.donor,
      type: payload.type,
      value: payload.value,
      date_received: payload.dateReceived,
      allocated_to: payload.allocatedTo,
      status: payload.status,
    })

    const index = donations.value.findIndex((d) => d.id === id)
    if (index !== -1) {
      donations.value[index] = {
        ...response.data,
        dateReceived: response.data.date_received,
        allocatedTo: response.data.allocated_to,
      }
    }

    closeRecordModal()

    toastMessage.value = `Donation from ${payload.donor} updated successfully`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to update donation:', error)
    toastMessage.value = 'Failed to update donation.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
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
  @click="editingDonation = null; showRecordModal = true"
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
<th class="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="d in filteredDonations"
            :key="d.id"
            class="cursor-pointer border-b border-slate-50 hover:bg-slate-50"
          >
            <td class="px-5 py-3 text-slate-500">{{ d.donation_code }}</td>
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
<td class="px-5 py-3 text-right">
  <div class="flex items-center justify-end gap-2">
    <button
      aria-label="View donation"
      class="text-slate-400 hover:text-slate-700"
      @click.stop="viewingDonation = d"
    >
      <Eye class="h-4 w-4" />
    </button>
    <button
      v-if="canRecordDonation"
      aria-label="Edit donation"
      class="text-slate-400 hover:text-slate-700"
      @click.stop="openEditModal(d)"
    >
      <Pencil class="h-4 w-4" />
    </button>
  </div>
</td>
          </tr>
          <tr v-if="filteredDonations.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-sm text-slate-400">
              No donations match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<RecordDonationModal
  v-if="showRecordModal"
  :donation="editingDonation"
  @close="closeRecordModal"
  @create="handleCreateDonation"
  @update="handleUpdateDonation"
/>

    <DonationDetailsModal
  v-if="viewingDonation"
  :donation="viewingDonation"
  :can-advance="canRecordDonation"
  @close="viewingDonation = null"
  @advance="(status) => { handleUpdateStatus(viewingDonation, status); viewingDonation = null }"
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
