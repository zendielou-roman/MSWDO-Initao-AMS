  <script setup>
  import {
    AlertCircle,
    AlertTriangle,
    Clock,
    FileBarChart2,
    FileText,
    Info,
    TrendingUp,
    Users2,
    Wallet,
  } from 'lucide-vue-next'
  import {
    oicApprovalBanner,
    oicStats,
    budgetUtilization,
    priorityAlerts,
    getUtilizationColor,
  } from '@/data/dummyOICDashboard'
  import OICApplicationsTrendChart from './OICApplicationsTrendChart.vue'
  
  function formatCurrency(amount) {
    if (amount >= 1000000) return `₱${(amount / 1000000).toFixed(1)}M`
    return `₱${amount.toLocaleString('en-PH')}`
  }
  
  const barColorClasses = {
    navy: 'bg-[#001d4c]',
    amber: 'bg-amber-400',
    rose: 'bg-rose-500',
  }
  
  const alertStyles = {
    critical: { icon: AlertTriangle, iconClass: 'text-rose-500', bgClass: 'bg-rose-50' },
    warning: { icon: AlertCircle, iconClass: 'text-amber-500', bgClass: 'bg-amber-50' },
    info: { icon: Info, iconClass: 'text-sky-500', bgClass: 'bg-sky-50' },
  }
  
  function handleReviewNow() {
    // Wired up once Assistance Management / approvals queue is built.
  }
  
  function handleGenerateReport() {
    // Wired up once Reports is built.
  }
  
  function handleViewApplications() {
    // Wired up once Assistance Management is built.
  }
  </script>
  
  <template>
    <div class="space-y-6">
      <!-- ===== APPROVALS BANNER ===== -->
      <div
        class="flex items-center justify-between rounded-2xl bg-[#001d4c] p-6 text-white"
      >
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
            <Clock class="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h2 class="text-base font-bold">
              {{ oicApprovalBanner.pendingCount }} Applications Awaiting Your Approval
            </h2>
            <p class="text-sm text-white/60">{{ oicApprovalBanner.message }}</p>
          </div>
        </div>
        <button
          @click="handleReviewNow"
          class="flex-shrink-0 cursor-not-allowed rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#001d4c] opacity-90"
          title="Wired up once Assistance Management is built"
        >
          Review Now
        </button>
      </div>
  
      <!-- ===== STAT CARDS ===== -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Highlighted: needs the OIC's direct action -->
        <div
          class="flex items-center gap-4 rounded-2xl border-2 border-amber-400 bg-white p-5 shadow-sm"
        >
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <Clock class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-amber-600">{{ oicStats.pendingApproval.value }}</p>
            <p class="text-sm font-medium text-slate-600">{{ oicStats.pendingApproval.label }}</p>
            <p class="text-xs text-amber-500">{{ oicStats.pendingApproval.period }}</p>
          </div>
        </div>
  
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <FileText class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">{{ oicStats.systemWideThisMonth.value }}</p>
            <p class="text-sm font-medium text-slate-600">{{ oicStats.systemWideThisMonth.label }}</p>
            <p class="text-xs text-slate-400">{{ oicStats.systemWideThisMonth.period }}</p>
          </div>
        </div>
  
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <TrendingUp class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">{{ oicStats.overallApprovalRate.value }}%</p>
            <p class="text-sm font-medium text-slate-600">{{ oicStats.overallApprovalRate.label }}</p>
            <p class="text-xs text-slate-400">{{ oicStats.overallApprovalRate.period }}</p>
          </div>
        </div>
  
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <Wallet class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">
              {{ formatCurrency(oicStats.totalBudgetReleased.value) }}
            </p>
            <p class="text-sm font-medium text-slate-600">{{ oicStats.totalBudgetReleased.label }}</p>
            <p class="text-xs text-slate-400">{{ oicStats.totalBudgetReleased.period }}</p>
          </div>
        </div>
      </div>
  
      <!-- ===== BUDGET UTILIZATION + SIDE PANELS ===== -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Budget Utilization by Program -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h3 class="mb-5 text-sm font-bold text-[#001d4c]">Budget Utilization by Program</h3>
          <ul class="space-y-5">
            <li v-for="program in budgetUtilization" :key="program.id">
              <div class="mb-1.5 flex items-baseline justify-between gap-3">
                <p class="truncate text-sm font-semibold text-slate-700">{{ program.name }}</p>
                <p class="flex-shrink-0 text-sm font-bold text-slate-600">{{ program.percent }}%</p>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full transition-all"
                  :class="barColorClasses[getUtilizationColor(program.percent)]"
                  :style="{ width: program.percent + '%' }"
                ></div>
              </div>
              <p class="mt-1 text-xs text-slate-400">
                {{ formatCurrency(program.released) }} / {{ formatCurrency(program.allocated) }}
              </p>
            </li>
          </ul>
        </div>
  
        <!-- Right column: Management Actions + Priority Alerts -->
        <div class="space-y-6">
          <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 class="mb-4 text-sm font-bold text-[#001d4c]">Management Actions</h3>
            <div class="space-y-3">
              <button
                @click="handleGenerateReport"
                class="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[#0047ab] px-4 py-2.5 text-sm font-semibold text-white opacity-90"
                title="Wired up once Reports is built"
              >
                <FileBarChart2 class="h-4 w-4" />
                Generate Financial Report
              </button>
              <button
                @click="handleViewApplications"
                class="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 opacity-90"
                title="Wired up once Assistance Management is built"
              >
                <Users2 class="h-4 w-4" />
                View Applications
              </button>
            </div>
          </div>
  
          <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 class="mb-4 text-sm font-bold text-[#001d4c]">Priority Alerts</h3>
            <ul class="space-y-4">
              <li v-for="alert in priorityAlerts" :key="alert.id" class="flex items-start gap-3">
                <div
                  class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  :class="alertStyles[alert.severity].bgClass"
                >
                  <component
                    :is="alertStyles[alert.severity].icon"
                    class="h-4 w-4"
                    :class="alertStyles[alert.severity].iconClass"
                  />
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-slate-700">{{ alert.message }}</p>
                  <p class="text-xs text-slate-400">{{ alert.timeAgo }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ===== MONTHLY APPLICATIONS TREND ===== -->
      <OICApplicationsTrendChart />
    </div>
  </template>
