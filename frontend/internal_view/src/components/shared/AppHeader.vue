<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Search, Bell, ChevronDown, LogOut, UserCircle, KeyRound } from 'lucide-vue-next'
import { mockNotifications, notificationTagOverrides } from '@/data/mockNotifications'

function toggleNotifDropdown() {
  showNotifDropdown.value = !showNotifDropdown.value
  showProfileMenu.value = false
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
  showNotifDropdown.value = false
}

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const searchQuery = ref('')
const showProfileMenu = ref(false)
const notifications = ref([...mockNotifications])
const showNotifDropdown = ref(false)

const unreadNotifications = computed(() => notifications.value.filter((n) => !n.read))
const notificationCount = computed(() => unreadNotifications.value.length)

// Preview shows the most recent 4 items — unread first, then most recent read ones to fill the gap
const previewNotifications = computed(() => {
  const unread = notifications.value.filter((n) => !n.read)
  const read = notifications.value.filter((n) => n.read)
  return [...unread, ...read].slice(0, 4)
})

function tagFor(notif) {
  return (
    notificationTagOverrides[notif.id] || {
      label: notif.category.toUpperCase(),
      style: 'bg-slate-100 text-slate-500',
    }
  )
}

function goToAllNotifications() {
  showNotifDropdown.value = false
  router.push('/notifications')
}

const pageTitle = computed(() => route.meta.title || 'Dashboard')

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
})

const initials = computed(() => {
  if (!auth.user?.name) return ''
  return auth.user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

function handleLogout() {
  auth.logout()
  router.push('/login')
}

function closeOnClickOutside(e) {
  if (!e.target.closest('.profile-menu-wrapper')) showProfileMenu.value = false
  if (!e.target.closest('.notif-menu-wrapper')) showNotifDropdown.value = false
}
onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-slate-200 bg-white py-4 pl-4 pr-8"
  >
    <!-- LEFT: page title + role/date subtitle -->
    <div>
      <h1 class="font-anton text-medium text-slate-800">{{ pageTitle }}</h1>
      <p class="text-xs text-slate-400">{{ auth.roleLabel }} || {{ formattedDate }}</p>
    </div>

    <!-- RIGHT: search, notifications, profile -->
    <div class="flex items-center gap-4">
      <!-- SEARCH -->
      <div class="relative hidden sm:block">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search clients, applications, IDs..."
          class="w-70 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-500"
        />
      </div>

      <!-- NOTIFICATION BELL + DROPDOWN -->
      <div class="notif-menu-wrapper relative">
        <button
          class="relative text-slate-500 transition hover:text-slate-700"
          aria-label="Notifications"
          @click.stop="toggleNotifDropdown"
        >
          <Bell class="h-5 w-5" />
          <span
            v-if="notificationCount > 0"
            class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-[#001d4c]"
          >
            {{ notificationCount }}
          </span>
        </button>

        <div
          v-if="showNotifDropdown"
          class="absolute right-0 top-11 z-30 w-96 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl"
        >
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <p class="font-sans text-base text-slate-800">Notifications</p>
            <span v-if="notificationCount > 0" class="text-xs font-semibold text-amber-600">
              {{ notificationCount }} new
            </span>
          </div>

          <div class="max-h-80 overflow-y-auto">
            <div
              v-for="notif in previewNotifications"
              :key="notif.id"
              class="flex items-start justify-between gap-3 border-b border-slate-50 px-5 py-3 last:border-0"
              :class="!notif.read ? 'bg-amber-50/30' : ''"
            >
              <div class="min-w-0">
                <p
                  class="text-sm"
                  :class="!notif.read ? 'font-semibold text-slate-800' : 'text-slate-600'"
                >
                  {{ notif.message }}
                </p>
                <p class="mt-0.5 text-xs text-slate-400">{{ notif.timestamp }}</p>
              </div>
              <span
                class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                :class="tagFor(notif).style"
              >
                {{ tagFor(notif).label }}
              </span>
            </div>

            <p
              v-if="previewNotifications.length === 0"
              class="px-5 py-6 text-center text-sm text-slate-400"
            >
              No notifications yet.
            </p>
          </div>

          <button
            class="w-full border-t border-slate-100 px-5 py-3 text-center text-sm font-semibold text-blue-600 hover:bg-slate-50"
            @click="goToAllNotifications"
          >
            View all notifications →
          </button>
        </div>
      </div>

      <!-- PROFILE DROPDOWN -->
      <div class="profile-menu-wrapper relative">
        <button class="flex items-center gap-1.5" @click.stop="toggleProfileMenu">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#001d4c] text-xs font-bold text-amber-400"
          >
            {{ initials }}
          </div>
          <ChevronDown class="h-4 w-4 text-slate-400" />
        </button>

        <div
          v-if="showProfileMenu"
          class="absolute right-0 top-11 w-48 rounded-lg border border-slate-100 bg-white py-2 shadow-lg"
        >
          <div class="border-b border-slate-100 px-4 py-2">
            <p class="truncate text-sm font-semibold text-slate-800">{{ auth.user?.name }}</p>
            <p class="truncate text-xs text-slate-400">{{ auth.roleLabel }}</p>
          </div>
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <UserCircle class="h-4 w-4" /> My Profile
          </button>
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            @click="router.push('/change-password')"
          >
            <KeyRound class="h-4 w-4" /> Change Password
          </button>
          <div class="my-1 border-t border-slate-100"></div>
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            @click="handleLogout"
          >
            <LogOut class="h-4 w-4" /> Log Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
