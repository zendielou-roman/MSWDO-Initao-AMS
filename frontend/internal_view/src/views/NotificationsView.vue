<script setup>
import { ref, computed, onMounted } from 'vue'
import { CircleCheck, CircleAlert, Activity, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import PageIntro from '@/components/shared/PageIntro.vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/lib/api'

const auth = useAuthStore()

function selectTab(key) {
  activeTab.value = key
  currentPage.value = 1
}

const notifications = ref([])
const isLoading = ref(true)

async function fetchNotifications() {
  try {
    const response = await api.get('/notifications', {
      params: { user_id: auth.user?.id },
    })
    notifications.value = response.data.map((n) => ({
      ...n,
      read: n.read,
      timestamp: new Date(n.created_at).toLocaleString(),
    }))
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchNotifications)
const activeTab = ref('all')
const currentPage = ref(1)
const perPage = 8

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'system', label: 'System' },
  { key: 'approvals', label: 'Approvals' },
]

const iconMap = {
  approval: { icon: CircleCheck, style: 'bg-emerald-50 text-emerald-600' },
  alert: { icon: CircleAlert, style: 'bg-amber-50 text-amber-600' },
  info: { icon: Activity, style: 'bg-slate-100 text-slate-500' },
}

const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value
  if (activeTab.value === 'unread') return notifications.value.filter((n) => !n.read)
  return notifications.value.filter((n) => n.category === activeTab.value)
})

const paginatedNotifications = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredNotifications.value.slice(start, start + perPage)
})
const totalPages = computed(() => Math.ceil(filteredNotifications.value.length / perPage) || 1)

async function markRead(notif) {
  try {
    await api.put(`/notifications/${notif.id}`, { read: true })
    notif.read = true
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
  }
}

async function markAllRead() {
  try {
    await api.post('/notifications/mark-all-read', { user_id: auth.user?.id })
    notifications.value.forEach((n) => (n.read = true))
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error)
  }
}
</script>

<template>
  <div>
    <PageIntro />

    <!-- TABS + MARK ALL READ -->
    <div
      class="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-5 pt-4"
    >
      <div class="flex gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="border-b-2 pb-3 text-sm font-medium transition"
          :class="
            activeTab === tab.key
              ? 'border-[#001d4c] text-[#001d4c]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          "
          @click="selectTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
      <button
        class="mb-3 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
        @click="markAllRead"
      >
        Mark All Read
      </button>
    </div>

    <!-- NOTIFICATION LIST -->
    <div class="rounded-b-xl border-x border-b border-slate-100 bg-white">
      <div
        v-for="notif in paginatedNotifications"
        :key="notif.id"
        class="flex items-center justify-between gap-3 border-b border-slate-50 px-5 py-4 last:border-0"
        :class="!notif.read ? 'bg-amber-50/40' : ''"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            :class="iconMap[notif.type].style"
          >
            <component :is="iconMap[notif.type].icon" class="h-4 w-4" />
          </div>
          <div>
            <p
              class="text-sm"
              :class="!notif.read ? 'font-semibold text-slate-800' : 'text-slate-600'"
            >
              {{ notif.message }}
            </p>
            <p class="mt-0.5 text-xs text-slate-400">{{ notif.timestamp }}</p>
          </div>
        </div>
        <button
          v-if="!notif.read"
          class="shrink-0 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          @click="markRead(notif)"
        >
          Mark read
        </button>
      </div>

      <p
        v-if="paginatedNotifications.length === 0"
        class="px-5 py-8 text-center text-sm text-slate-400"
      >
        No notifications in this view.
      </p>
    </div>

    <!-- PAGINATION -->
    <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
      <span>Showing {{ paginatedNotifications.length }} of {{ filteredNotifications.length }}</span>
      <div class="flex items-center gap-2">
        <button :disabled="currentPage === 1" class="disabled:opacity-30" @click="currentPage--">
          <ChevronLeft class="h-4 w-4" />
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          class="disabled:opacity-30"
          @click="currentPage++"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
