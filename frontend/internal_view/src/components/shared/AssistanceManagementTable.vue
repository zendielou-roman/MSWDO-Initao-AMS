<!-- src/components/shared/AssistanceManagementTable.vue -->
<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, FileText, CircleCheck, ClipboardList, CircleX } from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import { mockApplications, assistanceTypes } from '@/data/mockApplications'
import CreateApplicationModal from '@/components/shared/CreateApplicationModal.vue'

const showCreateModal = ref(false)
function handleApplicationSaved(record) {
  mockApplications.unshift(record)
}

const period = ref('monthly')
const statusTab = ref('all')
const searchQuery = ref('')
const typeFilter = ref('all')

const tabs = ['all', 'pending', 'approved', 'rejected', 'released']

const kpis = computed(() => {
  const total = mockApplications.length
  const approved = mockApplications.filter((a) => a.status === 'Approved').length
  const pending = mockApplications.filter((a) => a.status === 'Pending').length
  const rejected = mockApplications.filter((a) => a.status === 'Rejected').length
  const approvalRate = total ? Math.round((approved / total) * 100) : 0
  return { total, approved, pending, rejected, approvalRate }
})

const filteredApplications = computed(() => {
  return mockApplications.filter((a) => {
    const matchesTab = statusTab.value === 'all' || a.status.toLowerCase() === statusTab.value
    const matchesSearch =
      a.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = typeFilter.value === 'all' || a.type === typeFilter.value
    return matchesTab && matchesSearch && matchesType
  })
})

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Submit, screen, and process assistance applications. Approvals are handled by the OIC.
      </p>
      <button
        class="flex shrink-0 items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showCreateModal = true"
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

    <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        :label="`Total Applications (${period})`"
        :value="kpis.total"
        note="All programs"
        :icon="FileText"
      />
      <KPICard
        label="Approved"
        :value="kpis.approved"
        :note="`Approval rate ${kpis.approvalRate}%`"
        :icon="CircleCheck"
      />
      <KPICard
        label="Pending Review"
        :value="kpis.pending"
        note="Awaiting OIC"
        :icon="ClipboardList"
      />
      <KPICard label="Rejected" :value="kpis.rejected" :icon="CircleX" />
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
        <option v-for="t in assistanceTypes" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="mt-3 flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition"
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
              <p class="text-[10px] text-slate-400">assessed by {{ app.submittedBy }}</p>
            </td>
            <td class="px-5 py-3 text-blue-600">{{ app.type }}</td>
            <td class="px-5 py-3 text-slate-700">{{ formatCurrency(app.amount) }}</td>
            <td class="px-5 py-3 text-slate-600">{{ app.barangay }}</td>
            <td class="px-5 py-3 text-slate-500">{{ app.dateSubmitted }}</td>
            <td class="px-5 py-3"><StatusBadge :status="app.status" /></td>
          </tr>
          <tr v-if="filteredApplications.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-sm text-slate-400">
              No applications match your filters.
            </td>
          </tr>
        </tbody>
      </table>
      <CreateApplicationModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @saved="handleApplicationSaved"
      />
    </div>
  </div>
</template>
