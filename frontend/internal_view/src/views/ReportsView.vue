<script setup>
import { ref, computed } from 'vue'
import { Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { FileDown, FileSpreadsheet, Printer, Save, FileText, Download } from 'lucide-vue-next'
import {
  reportPrograms,
  reportBarangays,
  reportAssistanceTypes,
  reportTemplates,
  applicationsVsApprovals,
  distributionByProgram,
  recentlyGeneratedReports,
  casesPerBarangay,
  programSummaryReport,
} from '@/data/mockReports'
import { Bar } from 'vue-chartjs'
import { BarElement } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
)

// ===== ANALYTICS OVERVIEW (top section) =====
const fromDate = ref('2026-01-01')
const toDate = ref('2026-07-08')
const analyticsProgram = ref('AICS - Medical')
const analyticsBarangay = ref('All Barangays')
const analyticsType = ref('All Types')

const lineChartData = computed(() => ({
  labels: applicationsVsApprovals.labels,
  datasets: [
    {
      label: 'Applications',
      data: applicationsVsApprovals.applications,
      borderColor: '#001d4c',
      backgroundColor: '#001d4c',
      tension: 0.4,
      pointRadius: 3,
    },
    {
      label: 'Approved',
      data: applicationsVsApprovals.approved,
      borderColor: '#D4A017',
      backgroundColor: '#D4A017',
      tension: 0.4,
      pointRadius: 3,
    },
  ],
}))
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
  scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } },
}

const pieChartData = computed(() => ({
  labels: distributionByProgram.labels,
  datasets: [{ data: distributionByProgram.data, backgroundColor: distributionByProgram.colors }],
}))
const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
}

const barChartData = computed(() => ({
  labels: casesPerBarangay.labels,
  datasets: [
    {
      data: casesPerBarangay.data,
      backgroundColor: '#001d4c',
      borderRadius: 6,
      maxBarThickness: 40,
    },
  ],
}))
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } },
}

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}

function utilizationColor(pct) {
  if (pct >= 85) return 'text-red-600'
  if (pct >= 70) return 'text-amber-600'
  return 'text-emerald-600'
}

function exportTable() {
  alert('Exporting Program Summary Report table... (mock action)')
}

function exportCurrentView(format) {
  alert(`Exporting current analytics view as ${format}... (mock action)`)
}

// ===== GENERATE REPORT (bottom section) =====
const formRef = ref(null)
const reportType = ref('')
const genProgram = ref('All Programs')
const genDateFrom = ref('')
const genDateTo = ref('')
const genBarangay = ref('All Barangays')
const outputFormat = ref('PDF Document')

function useTemplate(template) {
  reportType.value = template.reportType
  formRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function generateReport() {
  if (!reportType.value || !genDateFrom.value || !genDateTo.value) {
    alert('Please select a Report Type and Date range before generating.')
    return
  }
  alert(`Generating "${reportType.value}" as ${outputFormat.value}... (mock action)`)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Generate summaries and export official reports for the office.
      </p>
      <div class="flex shrink-0 gap-2">
        <button
          class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          @click="exportCurrentView('PDF')"
        >
          <FileDown class="h-4 w-4" /> Export PDF
        </button>
        <button
          class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#012a63]"
          @click="exportCurrentView('Excel')"
        >
          <FileSpreadsheet class="h-4 w-4" /> Export Excel
        </button>
      </div>
    </div>
    <p class="mt-1 text-xs italic text-slate-400">
      "Export" above exports exactly what's shown in Analytics Overview below. To generate a formal
      document, use "Generate Report" further down.
    </p>

    <!-- ============ ANALYTICS OVERVIEW ============ -->
    <div class="mt-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p class="text-[11px] font-bold uppercase tracking-wide text-slate-400">Report Filters</p>
      <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <label class="text-[11px] font-medium text-slate-500">From</label>
          <input
            v-model="fromDate"
            type="date"
            class="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs"
          />
        </div>
        <div>
          <label class="text-[11px] font-medium text-slate-500">To</label>
          <input
            v-model="toDate"
            type="date"
            class="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs"
          />
        </div>
        <div>
          <label class="text-[11px] font-medium text-slate-500">Program</label>
          <select
            v-model="analyticsProgram"
            class="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs"
          >
            <option v-for="p in reportPrograms" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium text-slate-500">Barangay</label>
          <select
            v-model="analyticsBarangay"
            class="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs"
          >
            <option v-for="b in reportBarangays" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium text-slate-500">Assistance type</label>
          <select
            v-model="analyticsType"
            class="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs"
          >
            <option v-for="t in reportAssistanceTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="rounded-lg border border-slate-100 p-4 lg:col-span-2">
          <p class="text-sm font-semibold text-slate-800">Applications vs Approvals</p>
          <p class="text-xs text-slate-400">Monthly comparison across the reporting period</p>
          <div class="mt-3 h-56"><Line :data="lineChartData" :options="lineChartOptions" /></div>
        </div>
        <div class="rounded-lg border border-slate-100 p-4">
          <p class="text-sm font-semibold text-slate-800">Distribution by program</p>
          <p class="text-xs text-slate-400">Share of total cases</p>
          <div class="mt-3 h-56"><Pie :data="pieChartData" :options="pieChartOptions" /></div>
        </div>
      </div>
    </div>

    <!-- ============ GENERATE REPORT ============ -->
    <div ref="formRef" class="mt-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p class="font-anton text-base text-slate-800">Generate Report</p>
      <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="text-xs font-medium text-slate-600"
            >Report Type <span class="text-red-500">*</span></label
          >
          <select
            v-model="reportType"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          >
            <option value="">Select Report Type</option>
            <option v-for="t in reportTemplates" :key="t.id" :value="t.reportType">
              {{ t.reportType }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium text-slate-600">Program Filter</label>
          <select
            v-model="genProgram"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          >
            <option v-for="p in reportPrograms" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium text-slate-600"
            >Date From <span class="text-red-500">*</span></label
          >
          <input
            v-model="genDateFrom"
            type="date"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label class="text-xs font-medium text-slate-600"
            >Date To <span class="text-red-500">*</span></label
          >
          <input
            v-model="genDateTo"
            type="date"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label class="text-xs font-medium text-slate-600">Barangay Filter</label>
          <select
            v-model="genBarangay"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          >
            <option v-for="b in reportBarangays" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium text-slate-600">Output Format</label>
          <select
            v-model="outputFormat"
            class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          >
            <option>PDF Document</option>
            <option>Excel Spreadsheet</option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex gap-2">
        <button
          class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#012a63]"
          @click="generateReport"
        >
          <Save class="h-4 w-4" /> Generate Report
        </button>
        <button
          class="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <Printer class="h-4 w-4" /> Print Preview
        </button>
      </div>
    </div>

    <!-- REPORT TEMPLATES -->
    <div class="mt-6">
      <p class="font-anton text-base text-slate-800">Report Templates</p>
      <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="t in reportTemplates"
          :key="t.id"
          class="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left transition hover:border-slate-300 hover:shadow-sm"
          @click="useTemplate(t)"
        >
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <FileText class="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-800">{{ t.title }}</p>
            <p class="mt-0.5 text-xs text-slate-400">{{ t.description }}</p>
          </div>
        </button>
      </div>
    </div>

    <!-- RECENTLY GENERATED REPORTS -->
    <div class="mt-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p class="font-anton text-base text-slate-800">Recently Generated Reports</p>
      <div class="mt-3 divide-y divide-slate-50">
        <div
          v-for="r in recentlyGeneratedReports"
          :key="r.id"
          class="flex items-center justify-between gap-3 py-3"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
              <FileText class="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-slate-700">{{ r.title }}</p>
              <p class="text-xs text-slate-400">Generated by {{ r.generatedBy }} on {{ r.date }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{{
              r.format
            }}</span>
            <button aria-label="Download" class="text-slate-400 hover:text-slate-700">
              <Download class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CASES PER BARANGAY -->
    <div class="mt-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p class="font-anton text-base text-slate-800">Cases per barangay</p>
      <p class="text-xs text-slate-400">Top 8 barangays by processed cases</p>
      <div class="mt-4 h-64"><Bar :data="barChartData" :options="barChartOptions" /></div>
    </div>

    <!-- PROGRAM SUMMARY REPORT -->
    <div class="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 p-5">
        <p class="font-anton text-base text-slate-800">Program Summary Report</p>
        <button
          class="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          @click="exportTable"
        >
          <Download class="h-3.5 w-3.5" /> Export Table
        </button>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">Program</th>
            <th class="px-5 py-3 font-medium">Total Applications</th>
            <th class="px-5 py-3 font-medium">Approved</th>
            <th class="px-5 py-3 font-medium">Rejected</th>
            <th class="px-5 py-3 font-medium">Budget Released</th>
            <th class="px-5 py-3 font-medium">Beneficiaries</th>
            <th class="px-5 py-3 font-medium">Utilization %</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in programSummaryReport" :key="p.program" class="border-b border-slate-50">
            <td class="px-5 py-3 font-medium text-blue-600">{{ p.program }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.totalApplications }}</td>
            <td class="px-5 py-3 text-emerald-600">{{ p.approved }}</td>
            <td class="px-5 py-3 text-red-500">{{ p.rejected }}</td>
            <td class="px-5 py-3 text-slate-700">{{ formatCurrency(p.budgetReleased) }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.beneficiaries }}</td>
            <td class="px-5 py-3 font-semibold" :class="utilizationColor(p.utilization)">
              {{ p.utilization }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
