<!-- src/views/NotificationsView.vue -->
<script setup>
import { ref, reactive, computed } from 'vue'
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Activity,
  Clock,
  ChevronLeft,
  ChevronRight,
  BellOff,
} from 'lucide-vue-next'
import { dummyNotifications } from '@/data/dummyNotifications'

// Cloned into local reactive state so "Mark All Read" / per-item clicks can
// mutate `unread` client-side — becomes a PATCH request once backend is wired in.
const notifications = reactive(dummyNotifications.map((n) => ({ ...n })))

// Icon + color per notification type
const iconMap = {
  review: { icon: CheckCircle2, classes: 'bg-emerald-100 text-emerald-600' },
  approval: { icon: CheckCircle2, classes: 'bg-emerald-100 text-emerald-600' },
  budget: { icon: AlertCircle, classes: 'bg-amber-100 text-amber-600' },
  warning: { icon: AlertTriangle, classes: 'bg-amber-100 text-amber-600' },
  pending: { icon: Clock, classes: 'bg-amber-100 text-amber-600' },
  activity: { icon: Activity, classes: 'bg-slate-100 text-slate-500' },
}

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'system', label: 'System' },
  { key: 'approval', label: 'Approvals' },
]
const activeTab = ref('all')

const unreadCount = computed(() => notifications.filter((n) => n.unread).length)

const filtered = computed(() => {
  if (activeTab.value === 'all') return notifications
  if (activeTab.value === 'unread') return notifications.filter((n) => n.unread)
  return notifications.filter((n) => n.tab === activeTab.value)
})

// Pagination (all 8 dummy items fit on one page today; wired the same way as
// the other list pages so it keeps working once real data grows past a page)
const currentPage = ref(1)
const pageSize = 8
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

function markAllRead() {
  notifications.forEach((n) => (n.unread = false))
}

function markRead(notification) {
  notification.unread = false
}
</script>

<template>
  <div>
    <!-- Tabs + Mark All Read -->
    <div class="flex items-center justify-between border-b border-slate-200">
      <nav class="flex gap-6 text-sm">
 <button
  v-for="tab in tabs"
  :key="tab.key"
  @click="activeTab = tab.key; currentPage = 1"
  class="relative flex items-center gap-1.5 pb-3 font-medium transition"
  :class="
    activeTab === tab.key
      ? 'text-amber-500'
      : 'text-slate-500 hover:text-slate-700'
  "
>
          {{ tab.label }}
          <span
            v-if="tab.key === 'unread' && unreadCount > 0"
            class="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
          >
            {{ unreadCount }}
          </span>
          <span
            v-if="activeTab === tab.key"
            class="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-amber-400"
          />
        </button>
      </nav>

      <button
        @click="markAllRead"
        class="mb-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
      >
        Mark All Read
      </button>
    </div>

    <!-- Notification list -->
    <div class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div
        v-for="(notification, index) in paginated"
        :key="notification.id"
        @click="markRead(notification)"
        class="flex cursor-pointer items-start gap-3 px-5 py-4 transition hover:bg-slate-50"
        :class="[
          notification.unread ? 'bg-amber-50/60' : 'bg-white',
          index !== paginated.length - 1 ? 'border-b border-slate-100' : '',
        ]"
      >
        <div
          class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
          :class="iconMap[notification.type].classes"
        >
          <component :is="iconMap[notification.type].icon" class="h-4 w-4" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-sm text-slate-800" :class="{ 'font-semibold': notification.unread }">
            {{ notification.text }}
          </p>
          <p class="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Clock class="h-3 w-3" />
            {{ notification.time }}
          </p>
        </div>

        <span
          v-if="notification.unread"
          class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400"
        />
      </div>

      <!-- Empty state -->
      <div
        v-if="paginated.length === 0"
        class="flex flex-col items-center gap-2 px-6 py-14 text-center"
      >
        <BellOff class="h-8 w-8 text-slate-300" />
        <p class="text-sm font-medium text-slate-500">No notifications here</p>
        <p class="text-xs text-slate-400">You're all caught up!</p>
      </div>
    </div>

    <!-- Pagination footer -->
    <div
      v-if="filtered.length > 0"
      class="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-3.5 shadow-sm"
    >
      <p class="text-xs text-slate-400">
        Showing {{ (currentPage - 1) * pageSize + 1 }}–{{
          Math.min(currentPage * pageSize, filtered.length)
        }}
        of {{ filtered.length }}
      </p>
      <div class="flex items-center gap-1">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <span class="px-2 text-xs font-medium text-slate-500">{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>