  <template>
    <div>
      <!-- Action Bar (title/date already shown by StaffLayout's top bar) -->
      <div class="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="onExport"
        >
          <Download :size="16" />
          Export
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
          @click="onNewApplication"
        >
          <Plus :size="16" />
          New Application
        </button>
      </div>
  
      <!-- Stat Cards -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-slate-200 bg-white p-5">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <FileText :size="18" class="text-slate-500" />
          </div>
          <p class="text-2xl font-bold text-slate-900">{{ totalApplications }}</p>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Total Applications</p>
          <p class="mt-1 text-xs font-medium text-green-600">↑ 12% from last month</p>
        </div>
  
        <div class="rounded-xl border border-slate-200 bg-white p-5">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 :size="18" class="text-green-500" />
          </div>
          <p class="text-2xl font-bold text-slate-900">
            {{ approvedReleasedCount }}
            <span class="text-sm font-semibold text-slate-400">({{ approvalRate }}%)</span>
          </p>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Approved / Released</p>
          <p class="mt-1 text-xs font-medium text-slate-400">approval rate</p>
        </div>
  
        <div class="rounded-xl border-2 border-amber-300 bg-white p-5">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
            <Clock :size="18" class="text-amber-500" />
          </div>
          <p class="text-2xl font-bold text-slate-900">{{ pendingCount }}</p>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Pending Review</p>
          <p class="mt-1 text-xs font-medium text-amber-600">Requires action</p>
        </div>
  
        <div class="rounded-xl border border-slate-200 bg-white p-5">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
            <XCircle :size="18" class="text-red-500" />
          </div>
          <p class="text-2xl font-bold text-slate-900">{{ rejectedCount }}</p>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Rejected</p>
          <p class="mt-1 text-xs font-medium text-slate-400">{{ rejectionRate }}% rejection rate</p>
        </div>
      </div>
  
      <!-- Table Card -->
      <div class="rounded-xl border border-slate-200 bg-white">
        <!-- Status Tabs + Period Toggle -->
        <div class="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap items-center gap-1">
            <button
              v-for="tab in statusTabs"
              :key="tab.value"
              type="button"
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium"
              :class="
                statusFilter === tab.value
                  ? 'bg-[#001d4c] text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              "
              @click="statusFilter = tab.value"
            >
              {{ tab.label }}
              <span
                v-if="tab.value !== 'All'"
                class="rounded-full px-1.5 py-0.5 text-xs"
                :class="statusFilter === tab.value ? 'bg-white/20' : 'bg-slate-200 text-slate-600'"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>
  
          <!-- Non-functional period toggle: no backend/date-range data yet -->
          <div class="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-sm">
            <button
              v-for="period in ['Daily', 'Monthly', 'Yearly']"
              :key="period"
              type="button"
              class="rounded-md px-3 py-1.5 font-medium"
              :class="
                periodView === period
                  ? 'bg-white text-[#001d4c] shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              "
              @click="periodView = period"
            >
              {{ period }}
            </button>
          </div>
        </div>
  
        <!-- Search -->
        <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div class="relative flex-1">
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search application ID or client name..."
              class="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
            />
          </div>
  
          <select
            v-model="typeFilter"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-44"
          >
            <option value="All">All Types</option>
            <option v-for="type in typeOptions" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
  
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th class="px-4 py-3 font-medium">Application ID</th>
                <th class="px-4 py-3 font-medium">Client Name</th>
                <th class="px-4 py-3 font-medium">Barangay</th>
                <th class="px-4 py-3 font-medium">Type</th>
                <th class="px-4 py-3 font-medium">Amount</th>
                <th class="px-4 py-3 font-medium">Date Filed</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="application in filteredApplications"
                :key="application.applicationId"
                class="border-b border-slate-50 last:border-0 hover:bg-slate-50"
              >
                <td class="px-4 py-3 text-slate-500">{{ application.applicationId }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span
                      class="flex h-7 w-7 items-center justify-center rounded-full bg-[#001d4c]/10 text-xs font-semibold text-[#001d4c]"
                    >
                      {{ application.clientName.charAt(0) }}
                    </span>
                    <span class="font-medium text-slate-900">{{ application.clientName }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-slate-500">{{ application.barangay }}</td>
                <td class="px-4 py-3">
                  <AssistanceTypeBadge :type="application.type" />
                </td>
                <td class="px-4 py-3 font-medium text-slate-900">
                  ₱{{ application.amount.toLocaleString() }}
                </td>
                <td class="px-4 py-3 text-slate-500">{{ application.dateFiled }}</td>
                <td class="px-4 py-3">
                  <ApplicationStatusBadge :status="application.status" />
                </td>
                <td class="px-4 py-3 text-right">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#001d4c]"
                    @click="onViewApplication(application)"
                  >
                    <Eye :size="16" />
                  </button>
                </td>
              </tr>
  
              <tr v-if="filteredApplications.length === 0">
                <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                  No matching applications found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Footer -->
        <div class="flex items-center justify-end border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
          Showing {{ filteredApplications.length }} application{{ filteredApplications.length === 1 ? '' : 's' }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  import { CheckCircle2, Clock, Download, Eye, FileText, Plus, Search, XCircle } from 'lucide-vue-next'
  import ApplicationStatusBadge from '@/components/staff/ApplicationStatusBadge.vue'
  import AssistanceTypeBadge from '@/components/staff/AssistanceTypeBadge.vue'
  import { dummyApplications } from '@/data/dummyApplications.js'
  
  const searchQuery = ref('')
  const statusFilter = ref('All')
  const typeFilter = ref('All')
  const periodView = ref('Monthly')
  
  const typeOptions = ['Medical', 'Financial', 'Burial', 'Educational', 'Food']
  
  const totalApplications = computed(() => dummyApplications.length)
  
  const approvedReleasedCount = computed(
    () => dummyApplications.filter((a) => a.status === 'Approved' || a.status === 'Released').length
  )
  const approvalRate = computed(() =>
    totalApplications.value === 0
      ? 0
      : Math.round((approvedReleasedCount.value / totalApplications.value) * 100)
  )
  
  const pendingCount = computed(() => dummyApplications.filter((a) => a.status === 'Pending').length)
  
  const rejectedCount = computed(() => dummyApplications.filter((a) => a.status === 'Rejected').length)
  const rejectionRate = computed(() =>
    totalApplications.value === 0
      ? 0
      : Math.round((rejectedCount.value / totalApplications.value) * 100)
  )
  
  const statusTabs = computed(() => [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'Pending', count: pendingCount.value },
    {
      label: 'Approved',
      value: 'Approved',
      count: dummyApplications.filter((a) => a.status === 'Approved').length,
    },
    { label: 'Rejected', value: 'Rejected', count: rejectedCount.value },
    {
      label: 'Released',
      value: 'Released',
      count: dummyApplications.filter((a) => a.status === 'Released').length,
    },
  ])
  
  const filteredApplications = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
  
    return dummyApplications.filter((application) => {
      const matchesQuery =
        !query ||
        application.clientName.toLowerCase().includes(query) ||
        application.applicationId.toLowerCase().includes(query)
  
      const matchesStatus = statusFilter.value === 'All' || application.status === statusFilter.value
      const matchesType = typeFilter.value === 'All' || application.type === typeFilter.value
  
      return matchesQuery && matchesStatus && matchesType
    })
  })
  
  function onNewApplication() {
    // Non-functional for now — no backend yet.
    // Hook this up to a form/modal once the API is ready.
  }
  
  function onExport() {
    // Non-functional for now — no backend yet.
  }
  
  function onViewApplication(application) {
    // Non-functional for now — wire to an Application Details modal
    // (mirroring ClientDetailsModal) once fields are confirmed.
    console.log('View application:', application.applicationId)
  }
  </script>
  