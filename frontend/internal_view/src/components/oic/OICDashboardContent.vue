<!-- src/components/oic/OICDashboardContent.vue -->
<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { FileText, ClipboardList, CircleCheck, Users } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import NeedsMyApprovalWidget from '@/components/oic/NeedsMyApprovalWidget.vue'
import {
  dashboardKpis,
  applicationsTrend,
  budgetUtilization,
  recentActivity,
} from '@/data/mockDashboardShared'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const chartData = computed(() => ({
  labels: applicationsTrend.labels,
  datasets: [
    {
      data: applicationsTrend.data,
      borderColor: '#001d4c',
      backgroundColor: '#001d4c',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#D4A017',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false } },
  },
}

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}
</script>

<template>
  <div>
    <!-- KPI CARDS — Pending Review gets a highlighted treatment since it's OIC's own queue -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        label="Applications This Month"
        :value="dashboardKpis.applicationsThisMonth.value"
        :note="dashboardKpis.applicationsThisMonth.note"
        :icon="FileText"
      />
      <div class="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <div class="flex items-start justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Pending Review
          </p>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
            <ClipboardList class="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <p class="mt-2 font-anton text-2xl text-slate-800">
          {{ dashboardKpis.pendingReview.value }}
        </p>
        <p class="mt-1 text-xs font-medium text-amber-600">Requires your action</p>
      </div>
      <KPICard
        label="Approval Rate"
        :value="dashboardKpis.approvalRate.value"
        :note="dashboardKpis.approvalRate.note"
        :icon="CircleCheck"
      />
      <KPICard
        label="Beneficiaries Assisted"
        :value="dashboardKpis.beneficiariesAssisted.value"
        :note="dashboardKpis.beneficiariesAssisted.note"
        :icon="Users"
      />
    </div>

    <!-- NEEDS MY APPROVAL — the piece that makes this genuinely different from Admin's dashboard -->
    <div class="mt-4">
      <NeedsMyApprovalWidget />
    </div>

    <!-- CHART + BUDGET UTILIZATION -->
    <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
        <p class="font-anton text-base text-slate-800">Applications trend</p>
        <p class="text-xs text-slate-400">Monthly submissions across all programs</p>
        <div class="mt-4 h-56">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <p class="font-anton text-base text-slate-800">Budget utilization</p>
        <p class="text-xs text-slate-400">% released vs allocated per program</p>
        <div class="mt-4 space-y-4">
          <div v-for="item in budgetUtilization" :key="item.program">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-slate-600">{{ item.program }}</span>
              <span class="font-semibold text-slate-700">{{ item.percent }}%</span>
            </div>
            <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-[#001d4c]"
                :style="{ width: item.percent + '%' }"
              ></div>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">
              {{ formatCurrency(item.released) }} / {{ formatCurrency(item.allocated) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- RECENT ACTIVITY -->
    <div class="mt-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-anton text-base text-slate-800">Recent activity</p>
          <p class="text-xs text-slate-400">Latest applications submitted to the office</p>
        </div>
        <RouterLink to="/assistance" class="text-xs font-semibold text-blue-600 hover:underline">
          View all →
        </RouterLink>
      </div>

      <table class="mt-4 w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="pb-2 font-medium">ID</th>
            <th class="pb-2 font-medium">Beneficiary Name</th>
            <th class="pb-2 font-medium">Assistance Type</th>
            <th class="pb-2 font-medium">Date Applied</th>
            <th class="pb-2 font-medium">Amount</th>
            <th class="pb-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in recentActivity" :key="row.id" class="border-b border-slate-50">
            <td class="py-2.5 text-slate-500">{{ row.id }}</td>
            <td class="py-2.5 font-medium text-slate-700">{{ row.name }}</td>
            <td class="py-2.5 text-blue-600">{{ row.type }}</td>
            <td class="py-2.5 text-slate-500">{{ row.date }}</td>
            <td class="py-2.5 text-slate-700">{{ formatCurrency(row.amount) }}</td>
            <td class="py-2.5 text-right"><StatusBadge :status="row.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
