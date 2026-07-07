  <script setup>
  import { FileText, Clock, TrendingUp, Users, Plus } from 'lucide-vue-next'
  import { staffStats, recentApplications } from '@/data/dummyStaffApplications'
  import ApplicationStatusBadge from '@/components/staff/ApplicationStatusBadge.vue'
  import MonthlyApplicationsChart from '@/components/staff/MonthlyApplicationsChart.vue'
  
  function formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH')}`
  }
  
  function handleNewApplication() {
    // Wired up once the Assistance Management / application form flow is built.
  }
  </script>
  
  <template>
    <div class="space-y-6">
      <!-- ===== STAT CARDS ===== -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <FileText class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">{{ staffStats.submittedThisMonth.value }}</p>
            <p class="text-sm font-medium text-slate-600">{{ staffStats.submittedThisMonth.label }}</p>
            <p class="text-xs text-slate-400">{{ staffStats.submittedThisMonth.period }}</p>
          </div>
        </div>
  
        <!-- Highlighted: needs the staff member's attention -->
        <div
          class="flex items-center gap-4 rounded-2xl border-2 border-amber-400 bg-white p-5 shadow-sm"
        >
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <Clock class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-amber-600">{{ staffStats.pendingReview.value }}</p>
            <p class="text-sm font-medium text-slate-600">{{ staffStats.pendingReview.label }}</p>
            <p class="text-xs text-amber-500">{{ staffStats.pendingReview.period }}</p>
          </div>
        </div>
  
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <TrendingUp class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">{{ staffStats.approvalRate.value }}%</p>
            <p class="text-sm font-medium text-slate-600">{{ staffStats.approvalRate.label }}</p>
            <p class="text-xs text-slate-400">{{ staffStats.approvalRate.period }}</p>
          </div>
        </div>
  
        <div class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
            <Users class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#001d4c]">{{ staffStats.beneficiariesAssisted.value }}</p>
            <p class="text-sm font-medium text-slate-600">{{ staffStats.beneficiariesAssisted.label }}</p>
            <p class="text-xs text-slate-400">{{ staffStats.beneficiariesAssisted.period }}</p>
          </div>
        </div>
      </div>
  
      <!-- ===== "READY TO ASSIST A CLIENT?" BANNER ===== -->
      <div
        class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div>
          <h2 class="text-base font-bold text-[#001d4c]">Ready to assist a client?</h2>
          <p class="text-sm text-slate-500">
            Create a new assistance application for a registered beneficiary
          </p>
        </div>
        <button
          @click="handleNewApplication"
          class="flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white opacity-90"
          title="Wired up once Assistance Management is built"
        >
          <Plus class="h-4 w-4" />
          New Application
        </button>
      </div>
  
      <!-- ===== CHART + RECENT APPLICATIONS ===== -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <MonthlyApplicationsChart />
        </div>
  
        <div class="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h3 class="mb-4 text-sm font-bold text-[#001d4c]">Recent Applications</h3>
          <ul class="divide-y divide-slate-100">
            <li
              v-for="app in recentApplications"
              :key="app.id"
              class="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-600"
                >
                  {{ app.beneficiary.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-800">{{ app.beneficiary }}</p>
                  <p class="truncate text-xs text-slate-400">
                    {{ app.type }} · {{ formatCurrency(app.amount) }}
                  </p>
                </div>
              </div>
              <ApplicationStatusBadge :status="app.status" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>