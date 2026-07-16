<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, Sprout } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import { Handshake, HandCoins } from 'lucide-vue-next'
import { mockSLPBeneficiaries, slpTracks } from '@/data/mockSLPBeneficiaries'

const searchQuery = ref('')
const trackFilter = ref('All tracks')

const totalBeneficiaries = computed(() => mockSLPBeneficiaries.length)
const microEnterpriseCount = computed(
  () => mockSLPBeneficiaries.filter((b) => b.track === 'Micro-enterprise Development').length,
)
const employmentCount = computed(
  () => mockSLPBeneficiaries.filter((b) => b.track === 'Employment Facilitation').length,
)
const totalCapitalDisbursed = computed(() =>
  mockSLPBeneficiaries.reduce((sum, b) => sum + b.capital, 0),
)

const filteredBeneficiaries = computed(() => {
  return mockSLPBeneficiaries.filter((b) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
    const matchesTrack = trackFilter.value === 'All tracks' || b.track === trackFilter.value
    return matchesSearch && matchesTrack
  })
})

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  Completed: 'bg-blue-50 text-blue-600',
  Dropped: 'bg-red-50 text-red-600',
}

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Sustainable Livelihood Program — ownership module of the SLP Focal Person.
      </p>
      <button
        class="flex shrink-0 items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
      >
        <Plus class="h-4 w-4" />
        Add SLP Beneficiary
      </button>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <div class="flex items-start justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Total Beneficiaries
          </p>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
            <Sprout class="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <p class="mt-2 font-anton text-2xl text-slate-800">{{ totalBeneficiaries }}</p>
      </div>
      <KPICard label="Micro-enterprise" :value="microEnterpriseCount" :icon="HandCoins" />
      <KPICard label="Employment Facilitation" :value="employmentCount" :icon="Handshake" />
      <KPICard
        label="Total Capital Disbursed"
        :value="formatCurrency(totalCapitalDisbursed)"
        :icon="HandCoins"
      />
    </div>

    <!-- SEARCH + FILTER -->
    <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search beneficiaries..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="trackFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option v-for="t in slpTracks" :key="t" :value="t">{{ t }}</option>
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
            <th class="px-5 py-3 font-medium">Name</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">Track</th>
            <th class="px-5 py-3 font-medium">Project / Business</th>
            <th class="px-5 py-3 font-medium">Capital / Grant</th>
            <th class="px-5 py-3 font-medium">Enrolled</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBeneficiaries" :key="b.id" class="border-b border-slate-50">
            <td class="px-5 py-3 text-slate-500">{{ b.id }}</td>
            <td class="px-5 py-3 font-medium text-slate-700">{{ b.name }}</td>
            <td class="px-5 py-3 text-slate-600">{{ b.barangay }}</td>
            <td class="px-5 py-3 text-blue-600">{{ b.track }}</td>
            <td class="px-5 py-3 text-slate-600">{{ b.project }}</td>
            <td class="px-5 py-3 text-slate-700">{{ formatCurrency(b.capital) }}</td>
            <td class="px-5 py-3 text-slate-500">{{ b.dateEnrolled }}</td>
            <td class="px-5 py-3">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="statusStyles[b.status]"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                {{ b.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredBeneficiaries.length === 0">
            <td colspan="8" class="px-5 py-8 text-center text-sm text-slate-400">
              No beneficiaries match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
