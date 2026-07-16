<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { dashboardStats } from '@/data/Dashboard'
import { Users, Box, Heart, FileText } from 'lucide-vue-next'
import ApplicationVolumeChart from '@/components/dashboard/ApplicationVolumeChart.vue'
import SystemActivityLog from '@/components/dashboard/SystemActivityLog.vue'

const route = useRoute()

// Maps the string icon names in our dummy data to actual components.
const iconMap = { Users, Box, Heart, FileText }

// Which section shows below the stat cards — driven by the sidebar dropdown links.
// Defaults to 'activity' when no ?section= query is present.
const activeSection = computed(() => route.query.section || 'activity')
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- ========================= STAT CARDS + QUICK ACTIONS (always visible) ========================= -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <!-- Stat cards take up 3 of 4 columns, in their own 3-col grid -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3">
        <div
          v-for="(stat, i) in dashboardStats"
          :key="i"
          class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
          :class="stat.highlight ? 'ring-2 ring-amber-400' : ''"
        >
          <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
            :class="stat.highlight ? 'bg-amber-100' : 'bg-slate-100'"
          >
            <component
              :is="iconMap[stat.icon]"
              class="h-5 w-5"
              :class="stat.highlight ? 'text-amber-500' : 'text-slate-500'"
            />
          </div>
          <div>
            <p
              class="text-xl font-bold"
              :class="stat.highlight ? 'text-amber-500' : 'text-slate-800'"
            >
              {{ stat.value.toLocaleString() }}
            </p>
            <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
            <p class="text-[11px] text-slate-400">{{ stat.sublabel }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="rounded-xl bg-white p-4 shadow-sm">
        <p class="mb-3 text-sm font-bold text-slate-700">Quick Actions</p>
        <div class="space-y-2">
          <button
            class="w-full rounded-lg bg-[#001d4c] py-2.5 text-sm font-semibold text-white hover:bg-[#002a6e]"
          >
            + Create New User
          </button>
          <button
            class="w-full rounded-lg bg-[#d4a72c] py-2.5 text-sm font-semibold text-white hover:bg-[#c2961e]"
          >
            + Add New Program
          </button>
        </div>
      </div>
    </div>

    <!-- ========================= SWAPPABLE SECTION (driven by sidebar dropdown) ========================= -->
    <SystemActivityLog v-if="activeSection === 'activity'" class="mt-6" />
    <ApplicationVolumeChart v-else-if="activeSection === 'volume'" class="mt-6" />
  </div>
</template>
