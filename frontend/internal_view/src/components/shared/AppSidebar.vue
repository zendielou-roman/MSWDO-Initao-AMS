<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { menuMeta } from '@/config/roleConfig'
import {
  LayoutGrid,
  Users,
  FileText,
  Package,
  Gift,
  FileHeart,
  BookUser,
  Handshake,
  BarChart3,
  UserCog,
  Layers,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  TrendingUp,
} from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

const iconMap = {
  LayoutGrid,
  Users,
  FileText,
  Package,
  Gift,
  FileHeart,
  BookUser,
  Handshake,
  BarChart3,
  UserCog,
  Layers,
  Bell,
  TrendingUp,
}

// keys that count as "shared" — everything else in a role's sidebar is treated as their unique module
const sharedKeys = [
  'dashboard',
  'clients',
  'assistance',
  'relief',
  'donations',
  'reports',
  'user-management',
  'program-status',
  'notifications',
]

// labels shown above each role's unique focal module section
const focalModuleLabels = {
  aics_focal: 'AICS FOCAL MODULE',
  socpen_focal: 'SENIOR CITIZEN FOCAL MODULE',
  slp_focal: 'SLP FOCAL MODULE',
}

const sharedItems = computed(() => auth.sidebarItems.filter((k) => sharedKeys.includes(k)))
const focalItems = computed(() => auth.sidebarItems.filter((k) => !sharedKeys.includes(k)))
const focalLabel = computed(() => focalModuleLabels[auth.user?.role])

import { useUiStore } from '@/stores/ui'
const ui = useUiStore()

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
</script>

<template>
  <aside
    class="fixed left-0 top-0 flex h-screen flex-col bg-[#001d4c] text-white transition-all duration-200"
    :class="ui.sidebarCollapsed ? 'w-20' : 'w-69'"
  >
    <!-- HEADER: logo + system name + collapse toggle -->
    <div class="flex items-center justify-between border-b border-white/10 py-4 pl-2 pr-4">
      <div class="flex items-center -ml-1 overflow-hidden">
        <img src="/mswdo-seal.png" alt="MSWDO Seal" class="h-15 w-15 shrink-0 object-contain" />
        <div v-if="!ui.sidebarCollapsed" class="leading-tight">
          <p class="text-l font-lightbold tracking-wide font-anton">MSWDO INITAO</p>
          <p class="text-[10px] text-amber-400">Assistance Management System</p>
        </div>
      </div>
      <button
        class="shrink-0 -mr-2 text-white/60 transition hover:text-white"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="ui.toggleSidebar()"
      >
        <PanelLeftOpen v-if="isCollapsed" class="h-4 w-4" />
        <PanelLeftClose v-else class="h-4 w-4" />
      </button>
    </div>

    <!-- NAV LINKS -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      <!-- SHARED MODULES -->
      <RouterLink
        v-for="key in sharedItems"
        :key="key"
        :to="menuMeta[key].path"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/80 transition hover:bg-white/5"
        active-class="!bg-amber-400 !text-[#001d4c] font-semibold"
      >
        <component :is="iconMap[menuMeta[key].icon]" class="h-5 w-5 shrink-0" />
        <span v-if="!ui.sidebarCollapsed" class="truncate">{{ menuMeta[key].label }}</span>
      </RouterLink>
      <!-- FOCAL-SPECIFIC MODULE (labeled section, only rendered if the role has one) -->
      <template v-if="focalItems.length > 0">
        <div
          v-if="!ui.sidebarCollapsed"
          class="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wide text-amber-400"
        >
          {{ focalLabel }}
        </div>
        <div v-else class="my-3 border-t border-white/10"></div>

        <RouterLink
          v-for="key in focalItems"
          :key="key"
          :to="menuMeta[key].path"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/80 transition hover:bg-white/5"
          active-class="!bg-amber-400 !text-[#001d4c] font-semibold"
        >
          <component :is="iconMap[menuMeta[key].icon]" class="h-5 w-5 shrink-0" />
          <span v-if="!ui.sidebarCollapsed" class="truncate">{{ menuMeta[key].label }}</span>
        </RouterLink>
      </template>
    </nav>

    <!-- FOOTER: user avatar + name/role + logout -->
    <div class="border-t border-white/10 px-3 py-3">
      <div class="flex items-center gap-3 rounded-lg px-2 py-2">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-[#001d4c]"
        >
          {{ initials }}
        </div>
        <div v-if="!ui.sidebarCollapsed" class="min-w-0 flex-1 leading-tight">
          <p class="truncate text-sm font-semibold">{{ auth.user?.name }}</p>
          <p class="truncate text-[11px] text-white/50">{{ auth.roleLabel }}</p>
        </div>
        <button
          v-if="!ui.sidebarCollapsed"
          class="shrink-0 text-white/40 transition hover:text-white"
          aria-label="Log out"
          title="Log out"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </div>
  </aside>
</template>
