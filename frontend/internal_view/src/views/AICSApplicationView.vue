<script setup>
import { ref, computed } from 'vue'
import {
  FolderKanban,
  ClipboardList,
  Stethoscope,
  PackageCheck,
  Search,
  Plus,
  CircleCheck,
  CircleX,
} from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import AICSStatusBadge from '@/components/focal/AICSStatusBadge.vue'
import {
  mockAICSApplications,
  aicsStageStats,
  aicsAssistanceTypes,
} from '@/data/mockAICSApplications'

// ===== TOP SECTION: process-stage overview =====
function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}

// ===== BOTTOM SECTION: outcome tracking table =====
const period = ref('monthly')
const statusTab = ref('all')
const searchQuery = ref('')
const typeFilter = ref('all') // for future use if we want to filter by assistance type

const tabs = ['all', 'pending', 'for review', 'approved', 'rejected', 'released']

const outcomeKpis = computed(() => {
  const total = mockAICSApplications.length
  const approved = mockAICSApplications.filter((a) => a.status === 'Approved').length
  const pending = mockAICSApplications.filter((a) => a.status === 'Pending').length
  const forReview = mockAICSApplications.filter((a) => a.status === 'For Review').length
  const rejected = mockAICSApplications.filter((a) => a.status === 'Rejected').length
  const released = mockAICSApplications.filter((a) => a.status === 'Released').length
  // Approval rate calculated against RESOLVED applications only (Approved + Rejected + Released),
  // not against total — otherwise still-pending cases artificially drag the rate down.
  const resolved = approved + rejected + released
  const approvalRate = resolved ? Math.round(((approved + released) / resolved) * 100) : 0
  return { total, approved, pending, forReview, rejected, released, approvalRate }
})

const filteredApplications = computed(() => {
  return mockAICSApplications.filter((a) => {
    const matchesTab = statusTab.value === 'all' || a.status.toLowerCase() === statusTab.value
    const matchesSearch =
      a.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = typeFilter.value === 'all' || a.type === typeFilter.value
    return matchesTab && matchesSearch && matchesType
  })
})
</script>

<template>
  <div>
    <!-- ============ TOP: AICS APPLICATION PROCESS OVERVIEW ============ -->
    <p class="text-sm text-slate-500">
      Assistance to Individuals in Crisis Situations — DSWD 3-step process (Screening → Social
      Worker Interview → Approval & Release).
    </p>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div class="flex items-start justify-between">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Total AICS Cases
          </p>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
            <FolderKanban class="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <p class="mt-2 font-anton text-2xl text-slate-800">{{ aicsStageStats.totalCases }}</p>
        <p class="mt-1 text-xs text-amber-600">
          {{ formatCurrency(aicsStageStats.totalRequested) }} requested
        </p>
      </div>

      <KPICard label="At Screening" :value="aicsStageStats.atScreening" :icon="ClipboardList" />
      <KPICard label="SW Interview" :value="aicsStageStats.swInterview" :icon="Stethoscope" />
      <KPICard
        label="Approval / Release"
        :value="aicsStageStats.approvalRelease"
        :icon="PackageCheck"
      />
    </div>

    <!-- OWNERSHIP BANNER -->
    <div class="mt-4 rounded-xl bg-gradient-to-r from-[#001d4c] to-slate-600 p-4">
      <p class="text-xs font-bold uppercase tracking-wide text-amber-400">AICS Focal — Ownership</p>
      <p class="mt-1 text-sm text-white/80">
        This masterlist is maintained by the AICS Focal Person. All AICS-tagged applications
        submitted anywhere in the system appear here with their step tracker.
      </p>
    </div>

    <!-- ============ BOTTOM: AICS APPLICATIONS TABLE ============ -->
    <div class="mt-8 flex items-start justify-between">
      <div>
        <p class="font-anton text-lg text-slate-800">AICS Applications</p>
        <p class="text-sm text-slate-500">
          Submit, screen, and process assistance applications. Approvals are handled by the OIC.
        </p>
      </div>
      <button
        class="flex shrink-0 items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
      >
        <Plus class="h-4 w-4" />
        Create New Application
      </button>
    </div>

    <div class="mt-4 flex items-center gap-1 text-sm">
      <span class="mr-1 text-xs font-semibold text-slate-400">View:</span>
      <button
        v-for="p in ['daily', 'monthly', 'yearly']"
        :key="p"
        class="rounded-md px-3 py-1 text-xs font-medium capitalize transition"
        :class="period === p ? 'bg-[#001d4c] text-white' : 'text-slate-500 hover:bg-slate-100'"
        @click="period = p"
      >
        {{ p }}
      </button>
    </div>

    <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <KPICard
        :label="`Total Applications (${period})`"
        :value="outcomeKpis.total"
        note="All programs"
        :icon="FolderKanban"
      />
      <KPICard
        label="Approved"
        :value="outcomeKpis.approved"
        :note="`Approval rate ${outcomeKpis.approvalRate}%`"
        :icon="CircleCheck"
      />
      <KPICard
        label="Pending / For Review"
        :value="outcomeKpis.pending + outcomeKpis.forReview"
        note="Awaiting OIC / SW Interview"
        :icon="ClipboardList"
      />
      <KPICard label="Rejected" :value="outcomeKpis.rejected" :icon="CircleX" />
      <KPICard
        label="Released"
        :value="outcomeKpis.released"
        note="Assistance disbursed"
        :icon="PackageCheck"
      />
    </div>

    <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by client, ID..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="typeFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All assistance types</option>
        <option v-for="t in aicsAssistanceTypes" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="mt-3 flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 text-sm">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="flex-1 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium capitalize transition"
        :class="
          statusTab === tab
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        "
        @click="statusTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">Application ID</th>
            <th class="px-5 py-3 font-medium">Client</th>
            <th class="px-5 py-3 font-medium">Type</th>
            <th class="px-5 py-3 font-medium">Amount</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">Submitted</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="app in filteredApplications"
            :key="app.id"
            class="cursor-pointer border-b border-slate-50 hover:bg-slate-50"
          >
            <td class="px-5 py-3 text-slate-500">{{ app.id }}</td>
            <td class="px-5 py-3">
              <p class="font-medium text-slate-700">{{ app.clientName }}</p>
              <p class="text-[10px] text-slate-400">by {{ app.submittedBy }}</p>
            </td>
            <td class="px-5 py-3 text-blue-600">{{ app.type }}</td>
            <td class="px-5 py-3 text-slate-700">{{ formatCurrency(app.amount) }}</td>
            <td class="px-5 py-3 text-slate-600">{{ app.barangay }}</td>
            <td class="px-5 py-3 text-slate-500">{{ app.dateSubmitted }}</td>
            <td class="px-5 py-3"><AICSStatusBadge :status="app.status" /></td>
          </tr>
          <tr v-if="filteredApplications.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-sm text-slate-400">
              No applications match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
