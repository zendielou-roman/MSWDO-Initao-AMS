<script setup>
import { computed, ref } from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Users, MapPin, AlertTriangle, Repeat } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import { mockAICSApplications, barangaysOfInitao } from '@/data/mockAICSApplications'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

// ===== QUARTER SELECTION =====
const currentYear = new Date().getFullYear()
const selectedQuarter = ref('Q3') // default; adjust to current quarter as needed
const quarterOptions = ['Q1', 'Q2', 'Q3', 'Q4']

function getQuarter(dateStr) {
  const month = new Date(dateStr).getMonth() + 1
  if (month <= 3) return 'Q1'
  if (month <= 6) return 'Q2'
  if (month <= 9) return 'Q3'
  return 'Q4'
}

const quarterApplications = computed(() =>
  mockAICSApplications.filter((a) => getQuarter(a.dateSubmitted) === selectedQuarter.value),
)

// ===== 1. BENEFICIARIES + APPLICATIONS PER BARANGAY =====
const barangayStats = computed(() => {
  const map = {}
  mockAICSApplications.forEach((a) => {
    if (!map[a.barangay])
      map[a.barangay] = { barangay: a.barangay, clientIds: new Set(), applicationCount: 0 }
    map[a.barangay].clientIds.add(a.clientId)
    map[a.barangay].applicationCount++
  })
  return Object.values(map)
    .map((b) => ({
      barangay: b.barangay,
      beneficiaries: b.clientIds.size,
      applications: b.applicationCount,
    }))
    .sort((a, b) => b.beneficiaries - a.beneficiaries)
})

// only barangays with at least one recorded beneficiary, capped to the top 6
const topBarangays = computed(() =>
  barangayStats.value.filter((b) => b.beneficiaries > 0).slice(0, 6),
)

const barangayChartData = computed(() => ({
  labels: topBarangays.value.map((b) => b.barangay),
  datasets: [
    {
      data: topBarangays.value.map((b) => b.beneficiaries),
      backgroundColor: '#001d4c',
      borderRadius: 6,
      maxBarThickness: 40,
    },
  ],
}))
const barangayChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false } },
  },
}

// ===== 2. ASSISTANCE TYPE DISTRIBUTION =====
const typeStats = computed(() => {
  const map = {}
  mockAICSApplications.forEach((a) => {
    map[a.type] = (map[a.type] || 0) + 1
  })
  return map
})
const typeChartData = computed(() => ({
  labels: Object.keys(typeStats.value),
  datasets: [
    {
      data: Object.values(typeStats.value),
      backgroundColor: ['#001d4c', '#D4A017', '#ef4444', '#10b981', '#8b5cf6', '#0ea5e9'],
    },
  ],
}))
const typeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
}

// ===== 3. REPEAT ASSISTANCE TRACKER (within selected quarter) =====
const clientFrequency = computed(() => {
  const map = {}
  quarterApplications.value.forEach((a) => {
    if (!map[a.clientId])
      map[a.clientId] = {
        clientId: a.clientId,
        clientName: a.clientName,
        barangay: a.barangay,
        count: 0,
        types: [],
        lastDate: a.dateSubmitted,
      }
    map[a.clientId].count++
    map[a.clientId].types.push(a.type)
    if (a.dateSubmitted > map[a.clientId].lastDate) map[a.clientId].lastDate = a.dateSubmitted
  })
  return Object.values(map).sort((a, b) => b.count - a.count)
})
const repeatClients = computed(() => clientFrequency.value.filter((c) => c.count >= 2))

// ===== KPI SUMMARY =====
const totalUniqueBeneficiaries = computed(
  () => new Set(mockAICSApplications.map((a) => a.clientId)).size,
)
const topBarangay = computed(() => barangayStats.value[0]?.barangay || '—')
const repeatCount = computed(() => repeatClients.value.length)
</script>

<template>
  <div>
    <p class="text-sm text-slate-500">
      Insights on AICS assistance distribution and repeat requests — restricted to AICS Focal Person
      and Officer-in-Charge.
    </p>

    <!-- KPI SUMMARY -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard label="Total Unique Beneficiaries" :value="totalUniqueBeneficiaries" :icon="Users" />
      <KPICard
        label="Barangays Served"
        :value="barangayStats.filter((b) => b.beneficiaries > 0).length"
        :icon="MapPin"
      />
      <KPICard
        label="Barangays Served"
        :value="barangayStats.filter((b) => b.beneficiaries > 0).length"
        :icon="MapPin"
      />
      <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <div class="flex items-start justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Clients w/ Repeat Assistance
          </p>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
            <Repeat class="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <p class="mt-2 font-anton text-2xl text-slate-800">{{ repeatCount }}</p>
        <p class="mt-1 text-xs text-amber-600">This {{ selectedQuarter }}</p>
      </div>
    </div>

    <!-- CHARTS: BARANGAY + TYPE -->
    <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
        <p class="font-anton text-base text-slate-800">Top Barangays by Beneficiaries</p>
        <p class="text-xs text-slate-400">Highest 6 barangays by unique clients assisted</p>
        <div class="mt-4 h-64">
          <Bar :data="barangayChartData" :options="barangayChartOptions" />
        </div>
      </div>
      <div class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <p class="font-anton text-base text-slate-800">Assistance Type Availed</p>
        <p class="text-xs text-slate-400">Distribution across all AICS categories</p>
        <div class="mt-4 h-64"><Pie :data="typeChartData" :options="typeChartOptions" /></div>
      </div>
    </div>

    <!-- REPEAT ASSISTANCE TRACKER -->
    <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <p class="font-anton text-base text-slate-800">Repeat Assistance Tracker</p>
          <p class="text-xs text-slate-400">
            How many times each client received AICS assistance this quarter
          </p>
        </div>
        <select
          v-model="selectedQuarter"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
        >
          <option v-for="q in quarterOptions" :key="q" :value="q">{{ q }} {{ currentYear }}</option>
        </select>
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">Client</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">Times Assisted</th>
            <th class="px-5 py-3 font-medium">Assistance Types</th>
            <th class="px-5 py-3 font-medium">Last Received</th>
            <th class="px-5 py-3 font-medium">Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in clientFrequency"
            :key="c.clientId"
            class="border-b border-slate-50"
            :class="c.count >= 2 ? 'bg-amber-50/40' : ''"
          >
            <td class="px-5 py-3 font-medium text-slate-700">{{ c.clientName }}</td>
            <td class="px-5 py-3 text-slate-600">{{ c.barangay }}</td>
            <td
              class="px-5 py-3 font-semibold"
              :class="c.count >= 2 ? 'text-amber-700' : 'text-slate-700'"
            >
              {{ c.count }}x
            </td>
            <td class="px-5 py-3 text-slate-600">{{ c.types.join(', ') }}</td>
            <td class="px-5 py-3 text-slate-500">{{ c.lastDate }}</td>
            <td class="px-5 py-3">
              <span
                v-if="c.count >= 2"
                class="flex items-center gap-1 text-xs font-semibold text-amber-700"
              >
                <AlertTriangle class="h-3.5 w-3.5" /> Review
              </span>
            </td>
          </tr>
          <tr v-if="clientFrequency.length === 0">
            <td colspan="6" class="px-5 py-8 text-center text-sm text-slate-400">
              No AICS applications recorded for {{ selectedQuarter }}.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
