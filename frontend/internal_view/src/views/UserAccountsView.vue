<!-- src/views/UserAccountsView.vue -->
<script setup>
import { ref, computed } from 'vue'
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  UserRound,
  X,
  Users,
  ShieldCheck,
  CircleCheckBig,
} from 'lucide-vue-next'
import { dummyUsers, roles, statuses } from '@/data/DummyUsers'
import RoleBadge from '@/components/users/RoleBadge.vue'
import StatusBadge from '@/components/users/StatusBadge.vue'

// Stat card figures — derived from the dummy dataset so they stay in sync
const totalUsers = computed(() => dummyUsers.length)
const activeUsers = computed(() => dummyUsers.filter((u) => u.status === 'Active').length)
const adminUsers = computed(() => dummyUsers.filter((u) => u.role === 'Administrator').length)

// Placeholder trend text — static for now since there's no backend yet to compute real deltas
const newUsersThisWeek = 2
const currentlyLoggedIn = Math.min(4, activeUsers.value)

const searchQuery = ref('')
const roleFilter = ref('All')
const statusFilter = ref('All')
const currentPage = ref(1)
const pageSize = 6

const filteredUsers = computed(() => {
  return dummyUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = roleFilter.value === 'All' || user.role === roleFilter.value
    const matchesStatus = statusFilter.value === 'All' || user.status === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize)))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

function resetFilters() {
  searchQuery.value = ''
  roleFilter.value = 'All'
  statusFilter.value = 'All'
  currentPage.value = 1
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatLastLogin(dateStr) {
  if (!dateStr) return 'Never'
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

// Reset to page 1 whenever filters change so users don't land on an empty page
function onFilterChange() {
  currentPage.value = 1
}
</script>

<template>
  <div>
    <!-- Page header -->
    <div class="flex items-center justify-end">
      <button
        class="flex items-center gap-2 rounded-lg bg-[#0047ab] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00348a] active:scale-[0.98]"
      >
        <Plus class="h-4 w-4" />
        Create User
      </button>
    </div>

    <!-- Stat cards -->
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#001d4c]/10">
          <Users class="h-5 w-5 text-[#001d4c]" />
        </div>
        <div class="min-w-0">
          <p class="text-sm text-slate-500">Total Users</p>
          <p class="text-2xl font-bold text-slate-800">{{ totalUsers }}</p>
          <p class="text-xs font-medium text-emerald-600">+{{ newUsersThisWeek }} new this week</p>
        </div>
      </div>

      <div
        class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
          <CircleCheckBig class="h-5 w-5 text-emerald-600" />
        </div>
        <div class="min-w-0">
          <p class="text-sm text-slate-500">Active Users</p>
          <p class="text-2xl font-bold text-slate-800">{{ activeUsers }}</p>
          <p class="text-xs text-slate-400">Currently logged in: {{ currentlyLoggedIn }}</p>
        </div>
      </div>

      <div
        class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50">
          <ShieldCheck class="h-5 w-5 text-amber-500" />
        </div>
        <div class="min-w-0">
          <p class="text-sm text-slate-500">Admin Accounts</p>
          <p class="text-2xl font-bold text-slate-800">{{ adminUsers }}</p>
          <p class="text-xs text-slate-400">Full system access</p>
        </div>
      </div>
    </div>

    <!-- Filters bar -->
    <div
      class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="relative min-w-[220px] flex-1">
        <Search
          class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          v-model="searchQuery"
          @input="onFilterChange"
          type="text"
          placeholder="Search by name or email..."
          class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#001d4c]/40 focus:bg-white focus:ring-2 focus:ring-[#001d4c]/10"
        />
      </div>

      <select
        v-model="roleFilter"
        @change="onFilterChange"
        class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#001d4c]/40 focus:bg-white"
      >
        <option value="All">All Roles</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>

      <select
        v-model="statusFilter"
        @change="onFilterChange"
        class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#001d4c]/40 focus:bg-white"
      >
        <option value="All">All Statuses</option>
        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
      </select>

      <button
        v-if="searchQuery || roleFilter !== 'All' || statusFilter !== 'All'"
        @click="resetFilters"
        class="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X class="h-3.5 w-3.5" />
        Clear
      </button>
    </div>

    <!-- Table -->
    <div class="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table class="w-full table-fixed text-left text-sm">
        <colgroup>
          <col class="w-[28%]" />
          <col class="w-[13%]" />
          <col class="w-[12%]" />
          <col class="w-[15%]" />
          <col class="w-[16%]" />
          <col class="w-[16%]" />
        </colgroup>
        <thead class="border-b border-slate-200 bg-slate-50">
          <tr>
            <th class="px-6 py-3 font-semibold text-slate-500">User</th>
            <th class="px-3 py-3 text-center font-semibold text-slate-500">Role</th>
            <th class="px-3 py-3 text-center font-semibold text-slate-500">Status</th>
            <th class="px-3 py-3 text-center font-semibold text-slate-500">Date Created</th>
            <th class="px-3 py-3 text-center font-semibold text-slate-500">Last Login</th>
            <th class="px-6 py-3 text-right font-semibold text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in paginatedUsers" :key="user.id" class="transition hover:bg-slate-50">
            <td class="px-6 py-3.5">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#001d4c]/10 text-xs font-bold text-[#001d4c]"
                >
                  {{ getInitials(user.name) }}
                </div>
                <div class="min-w-0">
                  <p class="truncate font-medium text-slate-800">{{ user.name }}</p>
                  <p class="truncate text-xs text-slate-400">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-3 py-3.5 text-center">
              <RoleBadge :role="user.role" />
            </td>
            <td class="px-3 py-3.5 text-center">
              <StatusBadge :status="user.status" />
            </td>
            <td class="px-3 py-3.5 text-center text-slate-500">
              {{ formatDate(user.dateCreated) }}
            </td>
            <td class="px-3 py-3.5 text-center">
              <span :class="user.lastLogin ? 'text-slate-500' : 'italic text-slate-400'">
                {{ formatLastLogin(user.lastLogin) }}
              </span>
            </td>
            <td class="px-6 py-3.5">
              <div class="flex items-center justify-end gap-1">
                <button
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-[#001d4c]/10 hover:text-[#001d4c]"
                  title="Edit user"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  title="Deactivate user"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="paginatedUsers.length === 0">
            <td colspan="6" class="px-6 py-14 text-center">
              <div class="flex flex-col items-center gap-2">
                <UserRound class="h-8 w-8 text-slate-300" />
                <p class="text-sm font-medium text-slate-500">No users found</p>
                <p class="text-xs text-slate-400">Try adjusting your search or filters.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination footer -->
      <div
        v-if="filteredUsers.length > 0"
        class="flex items-center justify-between border-t border-slate-200 px-6 py-3.5"
      >
        <p class="text-xs text-slate-400">
          Showing {{ (currentPage - 1) * pageSize + 1 }}–{{
            Math.min(currentPage * pageSize, filteredUsers.length)
          }}
          of {{ filteredUsers.length }} users
        </p>
        <div class="flex items-center gap-1">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>
          <span class="px-2 text-xs font-medium text-slate-500"
            >{{ currentPage }} / {{ totalPages }}</span
          >
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
  </div>
</template>
