<script setup>
import { Home, Users, Box, Bell, ChevronLeft, ChevronDown, LogOut, Search } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => route.meta.title || 'Dashboard')

// Sidebar collapse state — expanded by default
const isCollapsed = ref(false)
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
  // Collapse should also close the Dashboard sub-menu since there's no room to show it
  if (isCollapsed.value) dashboardOpen.value = false
}

// Dashboard dropdown starts expanded since it's the default landing section
const dashboardOpen = ref(true)

// Which Dashboard sub-section is active (defaults to 'activity' when no query is set)
const activeSection = computed(() => route.query.section || 'activity')

function goToDashboard() {
  router.push('/dashboard')
  dashboardOpen.value = true
}

function handleDashboardClick() {
  // While collapsed there's no room for the sub-menu — just navigate instead of toggling it
  if (isCollapsed.value) {
    goToDashboard()
    return
  }
  dashboardOpen.value ? (dashboardOpen.value = false) : goToDashboard()
}

const today = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

function handleLogout() {
  auth.logout()
  router.push('/login')
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-100">
    <!-- ========================= SIDEBAR ========================= -->
    <aside
      class="sticky top-0 flex h-screen flex-shrink-0 flex-col bg-[#001d4c] text-white transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'w-20' : 'w-72'"
    >
      <!-- LOGO / HEADER -->
      <div
        class="flex h-20 items-center border-b border-white/10 px-5"
        :class="isCollapsed ? 'justify-center px-2' : 'justify-between'"
      >
        <div class="flex items-center gap-0 overflow-hidden">
          <img
            src="/mswdo-logo.png"
            alt="MSWDO Logo"
            class="h-18 w-18 flex-shrink-0 object-contain"
          />
          <div v-if="!isCollapsed" class="leading-tight whitespace-nowrap">
            <p class="font-display text-2xl font-normal text-slate-100">MSWDO INITAO</p>
            <p class="text-[11px] text-white/50">Assistance Management System</p>
          </div>
        </div>
        <button
          v-if="!isCollapsed"
          @click="toggleSidebar"
          class="text-white/40 hover:text-white"
          title="Collapse sidebar"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
      </div>

      <!-- COLLAPSED-ONLY EXPAND HANDLE -->
      <button
        v-if="isCollapsed"
        @click="toggleSidebar"
        class="mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
        title="Expand sidebar"
      >
        <ChevronLeft class="h-4 w-4 rotate-180" />
      </button>

      <!-- NAV LINKS -->
      <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4 text-sm">
        <!-- DASHBOARD (collapsible, with sub-links) -->
        <div class="rounded-lg" :class="{ 'bg-white/10': route.path === '/dashboard' }">
          <button
            @click="handleDashboardClick"
            class="flex w-full items-center py-2.5 font-semibold"
            :class="isCollapsed ? 'justify-center px-0' : 'justify-between px-3'"
            title="Dashboard"
          >
            <span class="flex items-center gap-3">
              <Home class="h-4 w-4 flex-shrink-0" />
              <span v-if="!isCollapsed">Dashboard</span>
            </span>
            <ChevronDown
              v-if="!isCollapsed"
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': dashboardOpen }"
            />
          </button>

          <div v-if="dashboardOpen && !isCollapsed" class="ml-11 space-y-1 pb-2 text-white/60">
            <router-link
              :to="{ path: '/dashboard', query: { section: 'activity' } }"
              class="block py-1 transition"
              :class="
                activeSection === 'activity'
                  ? 'font-semibold text-amber-400'
                  : 'hover:text-white/90'
              "
            >
              System Activity Log
            </router-link>
            <router-link
              :to="{ path: '/dashboard', query: { section: 'volume' } }"
              class="block py-1 transition"
              :class="
                activeSection === 'volume' ? 'font-semibold text-amber-400' : 'hover:text-white/90'
              "
            >
              Application Volume
            </router-link>

            <p class="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white/30">
              Quick Actions
            </p>
            <p class="cursor-not-allowed py-1 hover:text-white/90">Create User Account</p>
            <p class="cursor-not-allowed py-1 hover:text-white/90">Add New Program</p>
          </div>
        </div>

        <!-- OTHER SECTIONS -->
        <router-link
          to="/users"
          class="flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition"
          :class="[
            isCollapsed ? 'justify-center px-0' : 'px-3',
            route.path === '/users'
              ? 'bg-white/10 text-amber-400'
              : 'text-white/70 hover:bg-white/5 hover:text-white',
          ]"
          title="User Accounts"
        >
          <Users class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">User Accounts</span>
        </router-link>
        <div
          class="flex items-center gap-3 rounded-lg py-2.5 text-white/70 hover:bg-white/5"
          :class="isCollapsed ? 'justify-center px-0' : 'px-3'"
          title="Program Management"
        >
          <Box class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">Program Management</span>
        </div>
        <div
          class="flex items-center gap-3 rounded-lg py-2.5 text-white/70 hover:bg-white/5"
          :class="isCollapsed ? 'justify-center px-0' : 'px-3'"
          title="Notifications"
        >
          <Bell class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">Notifications</span>
        </div>
      </nav>

      <!-- USER FOOTER -->
      <div
        class="flex items-center border-t border-white/10 px-4 py-3"
        :class="isCollapsed ? 'flex-col gap-3 px-2' : 'justify-between'"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <div
            class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-[#001d4c]"
          >
            {{ getInitials(auth.user?.name) }}
          </div>
          <div v-if="!isCollapsed" class="leading-tight whitespace-nowrap">
            <p class="text-sm font-semibold">{{ auth.user?.name }}</p>
            <p class="text-[11px] text-amber-400">System Administrator</p>
          </div>
        </div>
        <button @click="handleLogout" class="text-white/40 hover:text-white" title="Logout">
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </aside>

    <!-- ========================= MAIN CONTENT ========================= -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <!-- ===== TOP BAR: title/date + search + bell + profile, one section ===== -->
      <header
        class="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4"
      >
        <div>
          <h1 class="text-xl font-bold text-slate-900">{{ pageTitle }}</h1>
          <p class="text-sm text-slate-400">Administrator · {{ today }}</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search records..."
              class="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
            />
          </div>

          <button class="relative rounded-full p-2 hover:bg-slate-100">
            <Bell class="h-5 w-5 text-slate-600" />
            <span
              class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-[#001d4c]"
            >
              4
            </span>
          </button>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#001d4c] text-sm font-semibold text-white"
          >
            {{ getInitials(auth.user?.name) }}
          </div>
        </div>
      </header>
      <!-- ===== END TOP BAR ===== -->

      <!-- Page content renders below the top bar -->
      <main class="flex-1 px-8 py-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
