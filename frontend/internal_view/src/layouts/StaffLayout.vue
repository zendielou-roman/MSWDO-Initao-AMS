<script setup>
import {
  Home,
  Users,
  HeartHandshake,
  Truck,
  Gift,
  ChevronLeft,
  LogOut,
  Search,
  Bell,
} from 'lucide-vue-next'
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

// Built pages get a real router-link (see the Dashboard + Clients & Beneficiaries
// links below). Everything else is listed here so the sidebar still shows the full
// staff navigation from the prototype, but renders as a disabled placeholder
// (no route) until each page is built one at a time.
const upcomingSections = [
  { label: 'Assistance Management', icon: HeartHandshake },
  { label: 'Relief Operations', icon: Truck },
  { label: 'Donations Management', icon: Gift },
]
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
          <img src="/mswdo-logo.png" alt="MSWDO Logo" class="h-18 w-18 flex-shrink-0 object-contain" />
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
        <router-link
          to="/staff/dashboard"
          class="flex items-center gap-3 rounded-lg py-2.5 font-medium transition"
          :class="[
            isCollapsed ? 'justify-center px-0' : 'px-3',
            route.path === '/staff/dashboard'
              ? 'bg-white/10 font-semibold text-amber-400'
              : 'text-white/70 hover:bg-white/5 hover:text-white',
          ]"
          title="Dashboard"
        >
          <Home class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>

        <router-link
          to="/staff/clients-beneficiaries"
          class="flex items-center gap-3 rounded-lg py-2.5 font-medium transition"
          :class="[
            isCollapsed ? 'justify-center px-0' : 'px-3',
            route.path === '/staff/clients-beneficiaries'
              ? 'bg-white/10 font-semibold text-amber-400'
              : 'text-white/70 hover:bg-white/5 hover:text-white',
          ]"
          title="Clients & Beneficiaries"
        >
          <Users class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">Clients &amp; Beneficiaries</span>
        </router-link>

        <!-- Not built yet — visible for context per the prototype, disabled until wired -->
        <p
          v-for="section in upcomingSections"
          :key="section.label"
          class="flex cursor-not-allowed items-center gap-3 rounded-lg py-2.5 font-medium text-white/30"
          :class="isCollapsed ? 'justify-center px-0' : 'px-3'"
          :title="section.label + ' (coming soon)'"
        >
          <component :is="section.icon" class="h-4 w-4 flex-shrink-0" />
          <span v-if="!isCollapsed">{{ section.label }}</span>
        </p>
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
            <p class="text-[11px] text-amber-400">MSWDO {{ auth.user?.role }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="text-white/40 hover:text-white" title="Logout">
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </aside>

    <!-- ========================= MAIN CONTENT ========================= -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <!-- ===== TOP BAR: title/date + search + bell + profile ===== -->
      <header
        class="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4"
      >
        <div>
          <h1 class="text-xl font-bold text-slate-900">{{ pageTitle }}</h1>
          <p class="text-sm text-slate-400">Staff · {{ today }}</p>
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

          <!-- Staff notifications page isn't built yet — icon shown for layout parity, not clickable -->
          <span class="rounded-full p-2" title="Notifications (coming soon)">
            <Bell class="h-5 w-5 text-slate-300" />
          </span>

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
