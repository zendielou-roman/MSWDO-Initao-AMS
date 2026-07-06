<script setup>
import { recentActivity } from '@/data/Dashboard'
</script>

<template>
  <div class="rounded-xl bg-white p-6 shadow-sm">
    <p class="mb-4 text-sm font-bold text-[#001d4c]">Recent System Activity Log</p>

    <table class="w-full text-left text-sm">
      <thead>
        <tr class="text-xs font-semibold uppercase tracking-wide text-slate-400">
          <th class="pb-2">Username</th>
          <th class="pb-2">Action</th>
          <th class="pb-2">Program/Target</th>
          <th class="pb-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in recentActivity" :key="i" class="border-t border-slate-100">
          <td class="py-3">
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                :class="item.color"
              >
                {{ item.initials }}
              </div>
              <div>
                <p class="font-medium text-slate-700">{{ item.username }}</p>
                <p class="text-xs text-slate-400">{{ item.timeAgo }}</p>
              </div>
            </div>
          </td>
          <td class="text-slate-600">{{ item.action }}</td>
          <td class="text-slate-600">{{ item.target }}</td>
          <td class="text-slate-600">{{ item.date }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="mt-4 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
    >
      View All Activities
    </button>
  </div>
</template>
