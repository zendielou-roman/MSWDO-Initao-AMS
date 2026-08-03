<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Download, Plus } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import { Users, MapPin, ShieldCheck } from 'lucide-vue-next'
import { barangaysForFilter } from '@/data/mockSocialPensionMasterlist'
import RegisterPensionerModal from '@/components/masterlist/RegisterPensionerModal.vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/lib/api'

const auth = useAuthStore()

const allBeneficiaries = ref([])
const isLoading = ref(true)

async function fetchBeneficiaries() {
  try {
    const response = await api.get('/social-pension-beneficiaries')
    allBeneficiaries.value = response.data.map((p) => ({
      ...p,
      oscaId: p.osca_id,
      dateRegistered: p.date_registered,
      lastPayout: p.last_payout || '—',
    }))
  } catch (error) {
    console.error('Failed to fetch beneficiaries:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchBeneficiaries)

const regionalList = computed(() => allBeneficiaries.value.filter((p) => p.source === 'Regional'))
const localList = computed(() => allBeneficiaries.value.filter((p) => p.source === 'Local'))

const showRegisterModal = ref(false)
const showExportConfirm = ref(false)
const toastMessage = ref('')

const activeTab = ref('regional')
const searchQuery = ref('')
const barangayFilter = ref('All barangays')

const currentList = computed(() =>
  activeTab.value === 'regional' ? regionalList.value : localList.value,
)

const activeRolls = computed(() => allBeneficiaries.value.filter((p) => p.status === 'Active').length)

async function handleRegisterPensioner(newPensioner) {
  try {
    const response = await api.post('/social-pension-beneficiaries', {
      name: newPensioner.name,
      age: newPensioner.age,
      barangay: newPensioner.barangay,
      osca_id: newPensioner.oscaId,
      source: newPensioner.source,
      registered_by: auth.user?.name || null,
    })

    allBeneficiaries.value.unshift({
      ...response.data,
      oscaId: response.data.osca_id,
      dateRegistered: response.data.date_registered,
      lastPayout: response.data.last_payout || '—',
    })

    showRegisterModal.value = false

    toastMessage.value = `${newPensioner.name} registered to the ${newPensioner.source} masterlist`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to register pensioner:', error)
    toastMessage.value = error.response?.data?.message || 'Failed to register pensioner.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
}

function requestExport() {
  showExportConfirm.value = true
}

function confirmExport() {
  showExportConfirm.value = false
  exportToCSV()

  toastMessage.value = `Exported ${filteredList.value.length} record(s) from the ${activeTab.value === 'regional' ? 'Regional' : 'Local'} masterlist`
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

function exportToCSV() {
  const headers = ['ID', 'Name', 'Age', 'Barangay', 'OSCA ID', 'Registered', 'Last Payout', 'Status']

  const rows = filteredList.value.map((p) => [
    p.pension_code,
    p.name,
    p.age,
    p.barangay,
    p.oscaId,
    p.dateRegistered,
    p.lastPayout,
    p.status,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `social-pension-${activeTab.value}-masterlist-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const filteredList = computed(() => {
  return currentList.value.filter((p) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(q) || p.oscaId.toLowerCase().includes(q)
    const matchesBarangay =
      barangayFilter.value === 'All barangays' || p.barangay === barangayFilter.value
    return matchesSearch && matchesBarangay
  })
})

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  Deceased: 'bg-slate-100 text-slate-500',
  Delisted: 'bg-red-50 text-red-600',
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Ownership module of the Senior Citizen Focal Person — maintained for both Regional and Local
        pension rolls.
      </p>
<div class="flex shrink-0 items-center gap-2">
<button
  class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
  @click="requestExport"
>
  <Download class="h-4 w-4" /> Export
</button>
  <button
    class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#012a63]"
    @click="showRegisterModal = true"
  >
    <Plus class="h-4 w-4" /> Register Pensioner
  </button>
</div>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <div class="flex items-start justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Regional Beneficiaries
          </p>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
            <MapPin class="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <p class="mt-2 font-anton text-2xl text-slate-800">{{ regionalList.length }}</p>
      </div>
      <KPICard label="Local Beneficiaries" :value="localList.length" :icon="Users" />
      <KPICard
        label="Active Rolls"
        :value="activeRolls"
        note="Excludes delisted / deceased"
        :icon="ShieldCheck"
      />
    </div>

    <!-- TAB TOGGLE -->
    <div class="mt-4 flex gap-1 rounded-lg bg-slate-100 p-1 text-sm w-fit">
      <button
        class="rounded-md px-4 py-1.5 text-xs font-medium transition"
        :class="
          activeTab === 'regional'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        "
        @click="activeTab = 'regional'"
      >
        Regional Masterlist
      </button>
      <button
        class="rounded-md px-4 py-1.5 text-xs font-medium transition"
        :class="
          activeTab === 'local'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        "
        @click="activeTab = 'local'"
      >
        Local Masterlist
      </button>
    </div>

    <!-- SEARCH + FILTER -->
    <div class="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or OSCA ID..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="barangayFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option v-for="b in barangaysForFilter" :key="b" :value="b">{{ b }}</option>
      </select>
      <span class="shrink-0 text-xs text-slate-400">{{ filteredList.length }} records</span>
    </div>

    <!-- TABLE -->
    <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">ID</th>
            <th class="px-5 py-3 font-medium">Name</th>
            <th class="px-5 py-3 font-medium">Age</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">OSCA ID</th>
            <th class="px-5 py-3 font-medium">Registered</th>
            <th class="px-5 py-3 font-medium">Last Payout</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredList" :key="p.id" class="border-b border-slate-50">
            <td class="px-5 py-3 text-slate-500">{{ p.pension_code }}</td>
            <td class="px-5 py-3 font-medium text-slate-700">{{ p.name }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.age }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.barangay }}</td>
            <td class="px-5 py-3 text-slate-500">{{ p.oscaId }}</td>
            <td class="px-5 py-3 text-slate-500">{{ p.dateRegistered }}</td>
            <td class="px-5 py-3 text-slate-500">{{ p.lastPayout }}</td>
            <td class="px-5 py-3">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="statusStyles[p.status]"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                {{ p.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredList.length === 0">
            <td colspan="8" class="px-5 py-8 text-center text-sm text-slate-400">
              No records match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <RegisterPensionerModal
  v-if="showRegisterModal"
  @close="showRegisterModal = false"
  @create="handleRegisterPensioner"
/>

<ConfirmDialog
  v-if="showExportConfirm"
  title="Export this masterlist?"
  :message="`This will download ${filteredList.length} record(s) from the ${activeTab === 'regional' ? 'Regional' : 'Local'} masterlist as a CSV file, based on your current search and filter.`"
  confirm-label="Export CSV"
  cancel-label="Cancel"
  variant="default"
  @confirm="confirmExport"
  @cancel="showExportConfirm = false"
/>

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
